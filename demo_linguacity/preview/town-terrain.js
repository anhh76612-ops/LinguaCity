import { makeTerrain } from './terrain';
import { gradeTownGround } from './town-paths';

export function makeTownTerrain({ clearGround, editableScenery, showScenery, groundPalette } = {}) {
  return makeTerrain({ clearGround, editableScenery, showScenery, groundPalette, gradeGround: gradeTownGround, showHillDetails: false });
}
