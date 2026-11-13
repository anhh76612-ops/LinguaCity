import { makeTerrain } from './terrain';
import { makeTownTerrain } from './town-terrain';
import { mountPlanning } from './planning-preview';
import { mountTerrainView } from './terrain-view';

const params = new URLSearchParams(location.search);
const original = params.get('dia-hinh') === '1';
const planning = !original && params.get('quy-hoach') === '1';

document.querySelector('#terrain-link').hidden = original;
if (planning) {
  document.querySelector('#planning-profile').hidden = false;
  document.querySelector('[data-camera="plan"]').hidden = false;
  document.querySelector('[data-camera="bridge"]').hidden = false;
  document.querySelector('h1').textContent = 'Duyệt quy hoạch';
  document.title = 'LinguaCity · Duyệt quy hoạch';
}

mountTerrainView({
  createTerrain: planning
    ? () => makeTerrain({ plannedHill: true })
    : () => (original ? makeTerrain : makeTownTerrain)({ showScenery: false, groundPalette: 'earth' }),
  initialView: planning ? 'plan' : 'overview',
  views: planning ? {
    plan: { x: .6, z: -2.4, span: 16.2, minWidth: 25.5 },
    bridge: { x: -8.8, y: .3, z: -4.85, span: 12.1, minWidth: 17.3 },
    hill: { x: 13.6, y: 2.55, z: -10.2, span: 13.7, minWidth: 20.8 },
  } : original ? {} : {
    hill: { x: 9.7, y: 1.75, z: -13.35, span: 13.9, minWidth: 21 },
  },
  mountLayers: planning ? ({ scene, canvas, terrain }) => ({
    controls: mountPlanning({ scene, canvas, surfaceY: terrain.surfaceY, blockers: terrain.blockers }),
  }) : undefined,
});
