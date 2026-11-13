window.TownScene = (() => {
  const model = window.TownModel;
  const art = window.TownArt;
  const roadStyles = {
    dirt: { shadow: '#63563c90', edge: '#997447', rim: '#b68d56', center: '#c19962', detail: '#a47d4c9c' },
    stone: { shadow: '#5b574290', edge: '#887351', rim: '#e1cc9e', center: '#cfbd95', detail: '#9f8a65a0' },
    asphalt: { shadow: '#4d563e99', edge: '#a28a65', rim: '#dbc49b', center: '#555e61', detail: '#f1e1ba' },
  };

  function loadImage(path) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(path));
      image.src = path;
    });
  }

  async function create(canvas, label) {
    const [terrain, houseLv1, houseLv3] = await Promise.all([
      loadImage(art.terrain), loadImage(art.houses[1].image), loadImage(art.houses[3].image),
    ]);
    const images = { 1: houseLv1, 3: houseLv3 };
    const context = canvas.getContext('2d');
    let drawnHouse = null;
    let roadShapes = [];
    let roadRevision = -1;

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(canvas.width / model.width, 0, 0, canvas.height / model.height, 0, 0);
    }

    function polygon(points, fill, stroke, width = 1) {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (const point of points.slice(1)) context.lineTo(point.x, point.y);
      context.closePath();
      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }
      if (stroke) {
        context.strokeStyle = stroke;
        context.lineWidth = width;
        context.lineJoin = 'round';
        context.stroke();
      }
    }

    function plot(x, z, size = 1, inset = 0) {
      return [model.project(x + inset, z + inset), model.project(x + size - inset, z + inset),
        model.project(x + size - inset, z + size - inset), model.project(x + inset, z + size - inset)];
    }

    function makeRoadShapes(roads) {
      return [...roads.values()].map(cell => {
        const center = model.project(cell.x + .5, cell.z + .5);
        const ends = model.directions.filter(([dx, dz]) => roads.has(model.key({ x: cell.x + dx, z: cell.z + dz })))
          .map(([dx, dz]) => model.project(cell.x + .5 + dx * .5, cell.z + .5 + dz * .5));
        const path = new Path2D();
        if (ends.length === 2) {
          path.moveTo(ends[0].x, ends[0].y);
          path.quadraticCurveTo(center.x, center.y, ends[1].x, ends[1].y);
        } else {
          for (const end of ends.length ? ends : [{ x: center.x + .1, y: center.y }]) {
            path.moveTo(center.x, center.y);
            path.lineTo(end.x, end.y);
          }
        }
        return { path, center, ends, material: cell.material, style: roadStyles[cell.material] };
      });
    }

    function stroke(path, width, color, dash = []) {
      context.lineWidth = width;
      context.strokeStyle = color;
      context.setLineDash(dash);
      context.stroke(path);
      context.setLineDash([]);
    }

    function drawRoads(state) {
      if (roadRevision !== state.roadRevision) {
        roadShapes = makeRoadShapes(state.roads);
        roadRevision = state.roadRevision;
      }
      context.save();
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.translate(1, 2);
      for (const segment of roadShapes) stroke(segment.path, 34, segment.style.shadow);
      context.translate(-1, -2);
      for (const segment of roadShapes) stroke(segment.path, 31, segment.style.edge);
      for (const segment of roadShapes) stroke(segment.path, 28.5, segment.style.rim);
      for (const segment of roadShapes) stroke(segment.path, 25, segment.style.center);
      for (const segment of roadShapes) {
        if (segment.material === 'asphalt') {
          stroke(segment.path, 1.7, segment.style.detail, [6, 7]);
        } else if (segment.material === 'dirt') {
          stroke(segment.path, 3, segment.style.detail, [2, 7]);
        } else {
          stroke(segment.path, .8, segment.style.detail);
          context.lineCap = 'butt';
          for (const end of segment.ends) {
            const dx = end.x - segment.center.x;
            const dy = end.y - segment.center.y;
            const length = Math.hypot(dx, dy);
            const normalX = -dy / length;
            const normalY = dx / length;
            const joint = new Path2D();
            for (const [position, side] of [[.3, -1], [.72, 1]]) {
              const x = segment.center.x + dx * position;
              const y = segment.center.y + dy * position;
              joint.moveTo(x, y);
              joint.lineTo(x + normalX * 11 * side, y + normalY * 11 * side);
            }
            stroke(joint, .9, segment.style.detail);
          }
          context.lineCap = 'round';
        }
      }
      context.restore();
    }

    function drawWater(time) {
      context.save();
      context.strokeStyle = '#d8fff0';
      context.lineCap = 'round';
      context.lineWidth = 1.5;
      for (const [index, [x, y]] of (art.ripples ?? []).entries()) {
        const shift = ((time / 140 + index * 7) % 18) - 9;
        const centerX = x * model.width + shift * .45;
        const centerY = y * model.height + shift;
        context.globalAlpha = .12 + .14 * (.5 + .5 * Math.sin(time / 700 + index));
        context.beginPath();
        context.moveTo(centerX - 10, centerY);
        context.quadraticCurveTo(centerX, centerY - 4, centerX + 9, centerY);
        context.stroke();
      }
      context.restore();
    }

    function drawGrid(focus, state, isPlace) {
      if (!focus) return;
      const size = isPlace ? model.footprint(focus) : 1;
      for (let x = focus.x - 1; x <= focus.x + size; x++) {
        for (let z = focus.z - 1; z <= focus.z + size; z++) {
          polygon(plot(x, z), '#fff4ca0e', '#fff8d583');
        }
      }
      const error = isPlace ? model.placementError(focus, state.roads) : model.roadError(focus, state.house, state.material);
      polygon(plot(focus.x, focus.z, size, .05), error ? '#b4483d48' : '#96d47542', error ? '#ffd0ba' : '#e7ffcb', 2.8);
    }

    function getSprite(house, pressed) {
      const image = images[house.level];
      const family = art.houses[house.level];
      const entry = family.sprites[house.rotation];
      const [left, top, sourceWidth, sourceHeight] = entry.box;
      const size = model.footprint(house);
      const point = model.project(house.x + size / 2, house.z + size / 2);
      const width = family.width * (1 + .04 * pressed);
      const height = family.width * sourceHeight / sourceWidth;
      const base = point.y + size * model.tileY * .72 + .7 * 12 * pressed;
      return { entry, image, left, top, sourceWidth, sourceHeight,
        x: point.x - width / 2, y: base - height, width, height, base, center: point };
    }

    function drawWindow(sprite, window, index, time) {
      const [u, v, w, h, slant = 0] = window;
      const x = sprite.x + u * sprite.width;
      const y = sprite.y + v * sprite.height;
      const width = w * sprite.width;
      const height = h * sprite.height;
      const tilt = slant * sprite.height;
      context.save();
      polygon([{ x, y }, { x: x + width, y: y + tilt },
        { x: x + width, y: y + height + tilt }, { x, y: y + height }], null);
      context.clip();
      context.fillStyle = '#ffd37b';
      context.globalAlpha *= .08 + .045 * Math.sin(time / 600 + index);
      context.fillRect(x, y + Math.min(0, tilt), width, height + Math.abs(tilt));
      context.restore();
      context.save();
      polygon([{ x, y }, { x: x + width, y: y + tilt },
        { x: x + width, y: y + height + tilt }, { x, y: y + height }], null);
      context.clip();
      const progress = (time / (3100 + index * 280) + index * .71 + .24) % 2.4;
      const position = (progress > 1.2 ? 2.4 - progress : progress) - .1;
      const headX = x + position * width;
      const headY = y + tilt * position + height * .43 + Math.sin(time / 100) * .65;
      const radius = Math.min(width * .22, height * .24);
      context.fillStyle = '#654538d9';
      context.beginPath();
      context.ellipse(headX, headY, radius * .7, radius, 0, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.ellipse(headX, headY + height * .44, radius * 1.19, height * .3, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    function drawHouse(house, time, { pressed = 0, opacity = 1, selected = false } = {}) {
      const sprite = getSprite(house, pressed);
      context.save();
      context.globalAlpha = opacity;
      const shadow = context.createRadialGradient(sprite.center.x + 10, sprite.base - 20, 5,
        sprite.center.x + 10, sprite.base - 20, sprite.width * .56);
      shadow.addColorStop(0, '#263e30a0');
      shadow.addColorStop(1, '#263e3000');
      context.fillStyle = shadow;
      context.beginPath();
      context.ellipse(sprite.center.x + 16, sprite.base - 18, sprite.width * .6, sprite.width * .19, .11, 0, Math.PI * 2);
      context.fill();
      if (selected) {
        const light = 1.015 + .085 * (.5 + .5 * Math.sin(time / 235));
        context.filter = `brightness(${light})`;
      }
      context.drawImage(sprite.image, sprite.left, sprite.top, sprite.sourceWidth, sprite.sourceHeight,
        sprite.x, sprite.y, sprite.width, sprite.height);
      context.filter = 'none';
      sprite.entry.windows.forEach((window, index) => drawWindow(sprite, window, index, time));
      context.restore();
      return sprite;
    }

    function draw(state, time, reduceMotion) {
      const sceneTime = reduceMotion ? 0 : time;
      context.drawImage(terrain, 0, 0, model.width, model.height);
      drawWater(sceneTime);
      drawRoads(state);
      if (state.mode === 'road') drawGrid(state.hover, state, false);
      if (state.mode === 'place') {
        drawGrid(state.draft, state, true);
        drawHouse(state.draft, sceneTime, { opacity: model.placementError(state.draft, state.roads) ? .48 : .74 });
        drawnHouse = null;
      } else {
        if (state.selected) {
          polygon(plot(state.house.x, state.house.z, model.footprint(state.house), .06), '#f3cf7d4d', '#fff3b2', 2.5);
        }
        drawnHouse = drawHouse(state.house, sceneTime, {
          selected: state.selected && !reduceMotion,
          pressed: reduceMotion ? 0 : model.pressAmount(state.press, time),
        });
      }
      if (state.selected && drawnHouse) {
        label.style.left = `${drawnHouse.center.x / model.width * 100}%`;
        label.style.top = `${Math.max(.07, (drawnHouse.y - 10) / model.height) * 100}%`;
      }
    }

    function pointAt(event) {
      const rect = canvas.getBoundingClientRect();
      return { x: (event.clientX - rect.left) * model.width / rect.width,
        y: (event.clientY - rect.top) * model.height / rect.height };
    }

    function hitHouse(point) {
      if (!drawnHouse) return false;
      const u = (point.x - drawnHouse.x) / drawnHouse.width;
      const v = (point.y - drawnHouse.y) / drawnHouse.height;
      if (v < 0 || v >= 1) return false;
      const rows = drawnHouse.entry.hit;
      const [left, right] = rows[Math.floor(v * rows.length)];
      return u >= left && u <= right;
    }

    return { resize, draw, pointAt, hitHouse };
  }

  return { create };
})();
