import * as THREE from 'three';
import { seeded } from '../../city-web/src/core/shapes';
import { makeChibi, randomLook } from '../../city-web/src/people/chibi';
import { applyPose, poseFor, restPose } from '../../city-web/src/people/poses';
import { makeBus, makeCar } from '../../city-web/src/world/buildings/road';
import { makeMotorcycle } from '../models/motorcycle';
import { lightPhase, signalAxes } from './planning-layout';
import { X, Z } from './roads';

const overlaps = (point, { x, z }, radius) => point.x > x - radius && point.x < x + 1 + radius &&
  point.z > z - radius && point.z < z + 1 + radius;

const garage = 'east:turn';
const destinations = ['hill:turn', 'west:turn'];

function connectTurn(graph, id, axis, t, side) {
  const arrival = [...graph.values()].find(node => node.section.axis === axis && node.section.t === t &&
    node.section.lo <= side && node.section.hi >= side && node.section.width >= 2 &&
    node.direction === 1 && node.index === 0 && !node.links.length);
  if (!arrival) return;
  const exit = graph.get(`${arrival.section.id}:-1:0`);
  if (!exit?.links.length) return;
  const turn = { ...arrival, id, links: [{ id: exit.id, crossing: false }],
    x: (arrival.x + exit.x) / 2 + (axis === X ? .31 : 0),
    z: (arrival.z + exit.z) / 2 + (axis === Z ? .31 : 0) };
  graph.set(id, turn);
  arrival.links.push({ id, crossing: false });
}

export function roadPath(graph, start, end) {
  if (!graph.has(start) || !graph.has(end)) return null;
  const parents = new Map([[start, null]]);
  const queue = [start];
  for (const id of queue) {
    if (id === end) {
      const path = [];
      for (let current = end; current !== start; current = parents.get(current)) path.push(current);
      return path.reverse();
    }
    for (const link of graph.get(id).links) {
      if (parents.has(link.id)) continue;
      parents.set(link.id, id);
      queue.push(link.id);
    }
  }
  return null;
}

export function connectPlanningTurns(graph) {
  connectTurn(graph, garage, X, 11, 0);
  connectTurn(graph, 'west:turn', Z, -5, -6);
}

export function makeTraffic(surfaceY, trips) {
  const group = new THREE.Group();
  const random = seeded(519);
  const actors = ['walk', 'walk', 'walk', 'walk', 'walk', 'car', 'car', 'motorcycle', 'motorcycle'].map((mode, index) => {
    const rig = mode === 'walk' ? makeChibi(randomLook(random)) : null;
    const bike = mode === 'motorcycle';
    const shuttle = index === 6;
    const model = rig?.root ?? (bike ? makeMotorcycle(index === 7 ? '#4b8682' : '#ab6256') :
      shuttle ? makeBus() : makeCar('#5a8899'));
    model.name = mode;
    model.scale.setScalar(rig ? .38 : bike ? 1 : .45);
    if (shuttle) model.scale.set(.36, .36, .23);
    model.visible = false;
    group.add(model);
    return {
      mode, model, rig, pose: rig && restPose(), index, node: null, next: null,
      speed: rig ? .79 + random() * .22 : bike ? 1.16 : 1.28, radius: rig ? .135 : bike ? .075 : .25,
      wait: 0, restartAt: 0, stride: 0, steps: 0, junction: null, path: [],
      origin: garage, destination: destinations[index - 5], returning: false,
    };
  });
  let graphs = {};
  let spawnNodes = {};
  let restricted = [];
  const restrict = cells => { restricted = cells; };
  const restrictedAt = (point, radius) => restricted.some(cell => overlaps(point, cell, radius));

  function setRoads(roads, walk, car, motorcycle = new Map()) {
    if (!trips) connectPlanningTurns(car);
    const routes = trips?.(car);
    graphs = { walk, car, motorcycle };
    for (const graph of [car, motorcycle]) {
      for (const node of graph.values()) node.signal = node.roundaboutEntry ? null : signalAxes(roads, node.section);
    }
    spawnNodes = {
      walk: [...walk.values()].filter(node => node.links.length && !node.section.junction)
        .sort((a, b) => a.section.width - b.section.width || b.z - a.z),
      motorcycle: [...motorcycle.values()].filter(node => node.links.length && !node.section.junction)
        .sort((a, b) => a.section.width - b.section.width || b.z - a.z),
    };
    for (const actor of actors) {
      const graph = graphs[actor.mode];
      actor.path = [];
      if (routes && actor.mode === 'car') Object.assign(actor, routes[actor.index - 5]);
      if (!graph.has(actor.node) || (actor.next && !graph.has(actor.next))) {
        actor.node = actor.next = null;
        actor.junction = null;
        if (actor.mode !== 'car') actor.model.visible = false;
        else if (actor.model.visible) {
          const at = [...graph.values()].find(node => Math.hypot(
            node.x - actor.model.position.x, node.z - actor.model.position.z) < .12);
          actor.node = at?.id ?? null;
        }
      }
    }
  }

  function moveTo(actor, x, z) {
    actor.model.position.set(x, surfaceY(x, z) + .046, z);
  }

  function spawn(actor) {
    if (actor.mode === 'car') {
      if (actor.model.visible) return;
      const graph = graphs.car;
      const out = roadPath(graph, actor.origin, actor.destination);
      if (!out?.length || !roadPath(graph, actor.destination, actor.origin)) return;
      const start = graph.get(actor.origin);
      if (restrictedAt(start, actor.radius) || actors.some(other => other !== actor && other.model.visible &&
        Math.hypot(other.model.position.x - start.x, other.model.position.z - start.z) < .85)) return;
      actor.node = start.id;
      actor.path = out;
      moveTo(actor, start.x, start.z);
      actor.model.visible = true;
      return;
    }
    const candidates = spawnNodes[actor.mode] ?? [];
    const start = Math.floor((actor.index + actor.steps * .63) * candidates.length / actors.length);
    for (let i = 0; i < candidates.length; i++) {
      const node = candidates[(start + i) % candidates.length];
      if (restrictedAt(node, actor.radius)) continue;
      if (actors.some(other => other.model.visible &&
        Math.hypot(other.model.position.x - node.x, other.model.position.z - node.z) < .85)) continue;
      moveTo(actor, node.x, node.z);
      actor.node = node.id;
      actor.model.visible = true;
      actor.wait = 0;
      return;
    }
  }

  function choose(actor, graph, from) {
    if (actor.mode === 'car') {
      if (!actor.path.length) actor.path = roadPath(graph, from.id, actor.returning ? actor.origin : actor.destination) ?? [];
      return actor.path[0];
    }
    if (trips && from.junction) {
      const queue = [{ node: from, first: null }];
      const seen = new Set([from.id]);
      for (const { node, first } of queue) for (const link of node.links) {
        const next = graph.get(link.id);
        if (seen.has(next.id)) continue;
        seen.add(next.id);
        if (next.junction === from.junction) {
          queue.push({ node: next, first: first ?? next.id });
        } else if (!actors.some(other => other !== actor && other.model.visible &&
          Math.hypot(other.model.position.x - next.x, other.model.position.z - next.z) < .42)) {
          return first ?? next.id;
        }
      }
    }
    const straight = from.links.filter(link => !link.crossing);
    const corners = from.links.filter(link => link.crossing);
    const choices = corners.length && (!straight.length || (actor.index + actor.steps) % 5 === 0) ? corners : straight;
    if (choices.length) return choices[actor.index % choices.length].id;
    const turn = `${from.section.id}:${-from.direction}:${from.index}`;
    return graph.get(turn)?.links.length ? turn : null;
  }

  function tick(time, dt) {
    for (const actor of [...actors].sort((a, b) => b.wait - a.wait || Number(a.mode === 'car') - Number(b.mode === 'car'))) {
      if (!actor.node) {
        if (time >= actor.restartAt) spawn(actor);
        continue;
      }
      if (time < actor.restartAt) continue;
      const graph = graphs[actor.mode];
      const from = graph.get(actor.node);
      const id = actor.next ?? choose(actor, graph, from);
      if (!id) {
        if (actor.mode === 'car') continue;
        actor.node = null;
        actor.junction = null;
        actor.model.visible = false;
        actor.restartAt = time + 1.4;
        actor.steps++;
        continue;
      }
      const end = graph.get(id);
      const entering = end.junction && from.junction !== end.junction;
      const red = !actor.next && entering && from.signal && lightPhase(time, from.signal) !== 'green';
      const pos = actor.model.position;
      const dx = end.x - pos.x, dz = end.z - pos.z;
      const distance = Math.hypot(dx, dz);
      const rate = actor.mode !== 'walk' && from.section.material === 'dirt' ? .77 : 1;
      const step = Math.min(distance, dt * actor.speed * rate);
      const x = distance > .001 ? pos.x + dx / distance * step : end.x;
      const z = distance > .001 ? pos.z + dz / distance * step : end.z;
      const diverted = !restrictedAt(pos, actor.radius) && restrictedAt(end, actor.radius);
      const yielding = entering && actors.some(other => other !== actor && other.junction === end.junction);
      const occupied = actors.some(other => {
        if (other === actor || !other.model.visible) return false;
        const ox = other.model.position.x - pos.x, oz = other.model.position.z - pos.z;
        const sameHeading = dx * Math.sin(other.model.rotation.y) + dz * Math.cos(other.model.rotation.y) > distance * .8;
        const following = actor.mode !== 'walk' && other.mode !== 'walk' && sameHeading && Math.abs(ox * dz - oz * dx) < .24 * distance;
        const safe = actor.radius + other.radius + (following ? .24 : .025);
        return ox * dx + oz * dz > 0 && Math.hypot(other.model.position.x - x, other.model.position.z - z) < safe;
      });
      const stopped = red || occupied || diverted || yielding;
      if (!stopped) {
        actor.wait = 0;
        actor.next = id;
        actor.junction = from.junction || end.junction;
        moveTo(actor, x, z);
        if (distance > .001) actor.model.rotation.y = Math.atan2(dx, dz);
        actor.stride += step * 14;
        if (distance <= step + .001) {
          actor.node = id;
          actor.next = null;
          actor.junction = end.junction;
          actor.steps++;
          if (actor.mode === 'car') {
            if (actor.path[0] === id) actor.path.shift();
            if (id === (actor.returning ? actor.origin : actor.destination)) {
              actor.returning = !actor.returning;
              actor.restartAt = time + 1.2;
              actor.junction = null;
            }
          }
        }
      } else actor.wait += dt;
      if (actor.rig) applyPose(actor.rig, actor.pose, poseFor(stopped ? 'idle' : 'walk', time, actor.stride, 0), dt, false);
    }
  }

  function busy(cells) {
    return actors.some(({ model, radius }) => model.visible && cells.some(cell => overlaps(model.position, cell, radius)));
  }

  return { group, setRoads, tick, busy, restrict };
}
