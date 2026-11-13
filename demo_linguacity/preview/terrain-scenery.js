import * as THREE from 'three';
import { bake } from '../../city-web/src/core/shapes';
import { cellKey } from './roads';

const chunkSize = 10;

export function makeTerrainScenery(source, surfaceY, blockerFor) {
  const group = new THREE.Group(), chunks = new Map(), records = new Map();
  const hidden = new Set();
  for (const [id, item] of source.children.entries()) {
    const { x, z } = item.position;
    const key = `${Math.floor(x / chunkSize)},${Math.floor(z / chunkSize)}`;
    if (!chunks.has(key)) chunks.set(key, { items: [], mesh: null });
    const chunk = chunks.get(key);
    const record = { id, item, x, z, chunk };
    const blocker = blockerFor.get(item);
    if (blocker) blocker.sceneryId = id;
    chunk.items.push(record);
    records.set(id, record);
  }

  function rebuild(chunk) {
    if (chunk.mesh) {
      group.remove(chunk.mesh);
      chunk.mesh.traverse(item => item.geometry?.dispose());
    }
    const batch = new THREE.Group();
    for (const { id, item } of chunk.items) {
      if (hidden.has(id)) continue;
      const copy = item.clone();
      copy.traverse(child => {
        if (!child.geometry) return;
        child.geometry = child.geometry.clone();
        if (child.geometry.hasAttribute('color')) child.userData.dynamic = true;
      });
      batch.add(copy);
    }
    chunk.mesh = bake(batch);
    group.add(chunk.mesh);
  }
  for (const chunk of chunks.values()) rebuild(chunk);

  function apply(ids, remove) {
    const changed = new Set();
    for (const id of ids) {
      if (!records.has(id) || hidden.has(id) === remove) continue;
      if (remove) hidden.add(id);
      else hidden.delete(id);
      changed.add(records.get(id).chunk);
    }
    for (const chunk of changed) rebuild(chunk);
  }

  function removals(core, changes, transition = []) {
    const keys = new Set(core.map(cellKey));
    const ring = new Set(transition.map(cellKey));
    const overrides = new Map(changes.map(({ index, newY }) => [index, newY]));
    return [...records.values()].filter(({ id, x, z }) => {
      if (hidden.has(id)) return false;
      const key = cellKey({ x: Math.floor(x), z: Math.floor(z) });
      return keys.has(key) || (ring.has(key) && Math.abs(surfaceY(x, z, overrides) - surfaceY(x, z)) > .025);
    }).map(item => item.id);
  }

  function points(ids) {
    return ids.map(id => records.get(id)).filter(Boolean);
  }

  return { group, apply, removals, points, hidden };
}
