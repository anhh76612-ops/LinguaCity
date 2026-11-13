import { mountTerrainView } from './preview/terrain-view';
import { makeTownTerrain } from './preview/town-terrain';
import { makeTown, townBuildingClearance } from './preview/town-layout';
import { townRoads, townRoadClearance, townTrips } from './preview/town-roads';
import { makeTownPaths, townHillRoad, townPathClearance } from './preview/town-paths';
import { mountPlanning } from './preview/planning-preview';

const roadClearance = townRoadClearance();

mountTerrainView({
  initialView: 'town',
  views: {
    town: { x: -3.75, y: 1.35, z: -5.95, span: 26.8, minWidth: 40 },
    plan: { x: 4.65, y: .65, z: .9, span: 13.8, minWidth: 24 },
    bridge: { x: -13.5, y: .95, z: -4.9, span: 12.7, minWidth: 22 },
    riverEdit: { x: -11.6, y: .32, z: 2.9, span: 10.8, minWidth: 15, elevation: 115 },
    hill: { x: 9.7, y: 1.75, z: -13.35, span: 13.9, minWidth: 21 },
  },
  createTerrain: () => makeTownTerrain({
    editableScenery: true,
    clearGround: (x, z, radius) => townPathClearance(x, z, radius) ||
      townBuildingClearance(x, z, radius) || roadClearance(x, z, radius),
  }),
  mountLayers({ scene, canvas, terrain }) {
    const { surfaceY, blockers } = terrain;
    const town = makeTown(surfaceY, townPathClearance);
    const paths = makeTownPaths(surfaceY);
    scene.add(paths.group, town.group);
    const buildings = town.buildings.map(item => item.model);
    return {
      controls: mountPlanning({
        scene, canvas, surfaceY, blockers,
        town: { ...town, terrain, protectedPath: townPathClearance, landscape: paths,
          hillRoute: townHillRoad, roadSample: townRoads, trips: townTrips },
      }),
      pickBuilding(ray) {
        let hit = ray.intersectObjects(buildings, true)[0]?.object;
        while (hit?.parent && hit.parent !== town.group) hit = hit.parent;
        return town.buildings.find(item => item.model === hit);
      },
    };
  },
});
