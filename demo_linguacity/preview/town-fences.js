import { closestHillRoad, hillPoint, hillRoadSamples, hillRoadWidth } from './hill-road';

const crest = [
  [-4.10, -1.4], [-4.18, -.45], [-4.09, .54], [-3.68, 1.46],
  [-3.25, 2.15], [-2.67, 2.80], [-1.92, 3.12],
].map(([u, v]) => {
  const at = hillPoint([u, v]), down = hillPoint([u * 1.25, v * 1.25]);
  return { x: at.x, z: at.z, downX: down.x, downZ: down.z };
});

const roadShoulder = [76, 80, 84, 88, 92].map(index => {
  const { x, z, dx, dz } = hillRoadSamples[index];
  return {
    x: x + dz * 1.2, z: z - dx * 1.2,
    downX: x + dz * 2.05, downZ: z - dx * 2.05,
  };
});

function hasSpace(x, z, blockers) {
  return (closestHillRoad(x, z)?.distance ?? Infinity) > hillRoadWidth / 2 + .12 &&
    !blockers.some(item => Math.hypot(item.x - x, item.z - z) < item.radius + .16);
}

export function townFenceRuns(surfaceY, blockers) {
  const runs = [];
  for (const candidates of [crest, roadShoulder]) {
    let run = [];
    for (const { x, z, downX, downZ } of candidates) {
      const y = surfaceY(x, z);
      const previous = run.at(-1);
      const clear = hasSpace(x, z, blockers);
      const drop = y - surfaceY(downX, downZ);
      const joined = !previous || (Math.abs(previous.y - y) <= .65 &&
        hasSpace((previous.x + x) / 2, (previous.z + z) / 2, blockers));
      if ((!joined || drop < .62 || !clear) && run.length) {
        if (run.length >= 3) runs.push(run);
        run = [];
      }
      if (clear && drop >= .62) run.push({ x, y, z });
    }
    if (run.length >= 3) runs.push(run);
  }
  return runs;
}
