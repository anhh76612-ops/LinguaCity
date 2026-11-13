import * as THREE from 'three';
import { cellKey } from './roads';
import { cellLayer } from './streets';

function boundaryEdges(cells) {
  const keys = new Set(cells.map(cellKey));
  const edges = [];
  for (const { x, z } of cells) {
    for (const [dx, dz, ...edge] of [[-1, 0, x, z, x, z + 1], [1, 0, x + 1, z, x + 1, z + 1],
      [0, -1, x, z, x + 1, z], [0, 1, x, z + 1, x + 1, z + 1]]) {
      if (!keys.has(cellKey({ x: x + dx, z: z + dz }))) edges.push(edge);
    }
  }
  return edges;
}

function addSegments(positions, [ax, az, bx, bz], height, divisions, dashed = false) {
  for (let i = 0; i < divisions; i += dashed ? 2 : 1) {
    for (const t of [i / divisions, (i + 1) / divisions]) {
      const x = THREE.MathUtils.lerp(ax, bx, t), z = THREE.MathUtils.lerp(az, bz, t);
      positions.push(x, height(x, z), z);
    }
  }
}

function lines(positions, color, opacity, order, depthFunc = THREE.LessEqualDepth) {
  const geometry = new THREE.BufferGeometry()
    .setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, depthFunc });
  const layer = new THREE.LineSegments(geometry, material);
  layer.renderOrder = order;
  return layer;
}

export function flattenPlanPreview({ core, transition, targetY, targetAt }, surfaceY, softShoulder) {
  const group = new THREE.Group();
  if (core.length) {
    const level = targetAt ?? (() => targetY);
    const face = cellLayer(core.map(cell => ({ ...cell, color: '#76e8ff' })), level,
      { opacity: .22, elevation: 0, order: 4 });
    face.material.polygonOffset = true;
    face.material.polygonOffsetFactor = -1;
    face.material.polygonOffsetUnits = -1;
    const outline = [], buriedOutline = [];
    for (const edge of boundaryEdges(core)) {
      addSegments(outline, edge, level, targetAt ? 8 : 1);
      addSegments(buriedOutline, edge, level, 8, true);
    }
    group.add(face, lines(outline, '#a3f5ff', .98, 8),
      lines(buriedOutline, '#a3f5ff', .70, 8, THREE.GreaterDepth));
  }
  if (transition.length) {
    const marks = [];
    const height = (x, z) => surfaceY(x, z) + .10;
    for (const edge of boundaryEdges(transition)) addSegments(marks, edge, height, 8, true);
    if (softShoulder) {
      for (const { x, z } of transition) {
        addSegments(marks, [x + .12, z + .56, x + .55, z + .13], height, 4);
        addSegments(marks, [x + .18, z + .87, x + .87, z + .18], height, 5);
        addSegments(marks, [x + .45, z + .87, x + .88, z + .44], height, 4);
      }
    }
    group.add(lines(marks, softShoulder ? '#ffeb90' : '#e7d6a6', softShoulder ? .90 : .60, 7));
  }
  return group;
}
