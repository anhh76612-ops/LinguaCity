import * as THREE from 'three';

const smooth = THREE.MathUtils.smoothstep;

// ── Palette: natural terrain inspired by reference isometric artwork ──
// Key principles:
//   • Flat land = muted sage-olive green, not yellow
//   • Moderate slopes = desaturated warm tan (NOT orange)
//   • Steep cliffs = distinctly cool gray rock with subtle strata
//   • Near water = deeper, richer green

// Flat / gentle ground
const meadowGreen   = new THREE.Color('#7d9e60');  // fresh grass on flat land
const oliveGreen    = new THREE.Color('#97a462');   // sunlit meadow
const warmGrass     = new THREE.Color('#a8ad72');   // dry grass patches
const darkGreen     = new THREE.Color('#5a7b48');   // deep shade / riverbank

// Sandy lowland base
const sandyGround   = new THREE.Color('#b5a87a');   // muted sandy ground
const warmTan       = new THREE.Color('#ab9a72');    // warm tan, low saturation

// Exposed soil on moderate slopes — desaturated warm brown, NOT orange
const dirtBrown     = new THREE.Color('#8e7858');   // muted brown soil
const clayTan       = new THREE.Color('#9a8868');    // tan clay, low saturation
const dryEarth      = new THREE.Color('#a49070');    // dry exposed earth, muted

// Rock layers on steep cliffs — cool gray, minimal warmth
const rockGray      = new THREE.Color('#697b83');   // cool blue-gray rock
const rockCool      = new THREE.Color('#778a90');   // cool medium rock
const rockLight     = new THREE.Color('#a3afb0');   // light gray-blue
const rockDark      = new THREE.Color('#5e5e58');   // dark crevice

// Cliff cross-section strata
const strataGrass   = new THREE.Color('#6a8e50');   // thin grass cap on cliff edge
const strataSoil    = new THREE.Color('#7e6e50');   // muted brown soil layer
const strataRock    = new THREE.Color('#61757b');   // deep cool rock layer

// Water edge & coast
const wetBank       = new THREE.Color('#667852');   // moist riverbank
const riverbed      = new THREE.Color('#586a50');   // submerged bank edge
const beach         = new THREE.Color('#c8b888');   // coastal sand

// Mountain peak / high altitude
const peakLight     = new THREE.Color('#c4c0b4');   // light peak (very neutral)
const peakRock      = new THREE.Color('#9e9c92');   // high-altitude neutral rock

export function colorEarthGround(geometry, riverOffset, inland) {
  const { position, normal, color } = geometry.attributes;
  const tint = new THREE.Color();
  const layer = new THREE.Color();

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
    const bank = riverOffset(x, z), coast = inland(x, z);
    const nx = normal.getX(i), ny = Math.max(.01, normal.getY(i)), nz = normal.getZ(i);
    const slope = Math.hypot(nx, nz) / ny;

    // Noise for natural variation
    const noise1 = Math.sin(x * .23 + z * .16) * Math.cos(z * .31 - x * .11);
    const noise2 = Math.sin(x * .41 + z * .29) * Math.sin(z * .19 - x * .37);
    const noise3 = Math.cos(x * .34 + z * .22);
    const strata = Math.sin(y * 7.3 + .8 * Math.sin(x * .36 + z * .21));
    const microDetail = Math.sin(y * 14.5 + x * 1.2 + z * .9);

    // ━━ 1. BASE: Green meadow with sandy patches ━━
    tint.copy(oliveGreen).lerp(warmGrass, .30 + .12 * noise1);
    // Add lush grass patches on flat areas
    const grassPatch = smooth(noise1, -.3, .5) * (1 - smooth(slope, .12, .40));
    tint.lerp(meadowGreen, grassPatch * .50);
    // Sandy ground patches
    tint.lerp(sandyGround, (.12 + .08 * noise2) * (1 - smooth(slope, .15, .45)));

    // ━━ 2. GENTLE SLOPES (15-45%): grass thinning, earth showing ━━
    const gentleSlope = smooth(slope, .15, .45) * (1 - smooth(slope, .45, .70));
    layer.copy(dryEarth).lerp(clayTan, .35 + .15 * noise1);
    tint.lerp(layer, gentleSlope * .55);

    // ━━ 3. MODERATE SLOPES (45-80%): exposed earth, muted brown ━━
    const moderateSlope = smooth(slope, .45, .80);
    layer.copy(dirtBrown).lerp(clayTan, .30 + .15 * noise2);
    tint.lerp(layer, moderateSlope * .75);

    // ━━ 4. STEEP SLOPES (80%+): Layered cliff face ━━
    const steepSlope = smooth(slope, .80, 1.2);

    if (steepSlope > .01) {
      // Cross-section strata: grass cap → soil → rock
      const bandPhase = y * 4.2 + noise1 * .6;
      const grassCapWeight = 1 - smooth(bandPhase % 3.0, .0, .5);
      const soilBandWeight = smooth(bandPhase % 3.0, .3, .8) * (1 - smooth(bandPhase % 3.0, 1.2, 1.8));
      const rockBandWeight = smooth(bandPhase % 3.0, 1.5, 2.4);

      // Thin green cap
      layer.copy(strataGrass).lerp(darkGreen, .15 + .1 * noise2);
      tint.lerp(layer, steepSlope * grassCapWeight * .65);

      // Muted soil mid-layer
      layer.copy(strataSoil).lerp(dirtBrown, .20 + .12 * strata);
      tint.lerp(layer, steepSlope * soilBandWeight * .70);

      // Cool gray rock base
      layer.copy(strataRock).lerp(rockCool, .25 + .20 * smooth(strata, -.3, .6) + .06 * microDetail);
      tint.lerp(layer, steepSlope * rockBandWeight * .85);

      // Dark crevices
      const crevice = smooth(slope, 1.4, 2.2) * (1 - smooth(strata, -.1, .5));
      tint.lerp(rockDark, crevice * .40);
    }

    // ━━ 5. CLIFF FACE (120%+): mostly cool gray rock ━━
    const cliffFace = smooth(slope, 1.2, 2.0);
    layer.copy(rockGray).lerp(rockLight, .25 + .25 * smooth(strata, -.20, .70) + .05 * microDetail);
    tint.lerp(layer, cliffFace * .90);

    // ━━ 6. HEIGHT-BASED SHIFTS ━━
    tint.lerp(peakRock, smooth(y, 5.0, 9.0) * .40);
    tint.lerp(peakLight, smooth(y, 8.5, 12.0) * .50);

    // Near-water lush vegetation
    const nearWater = 1 - smooth(bank, .8, 5.5);
    tint.lerp(darkGreen, nearWater * .30 * (1 - smooth(slope, .3, .8)));
    const riparian = (1 - smooth(bank, .4, 2.8)) * (1 - smooth(slope, .25, .6));
    tint.lerp(meadowGreen, riparian * .35);

    // ━━ 7. MICRO VARIATION ━━
    tint.multiplyScalar(1 + .045 * noise1 + .020 * noise3);

    // ━━ 8. WATER EDGE AND COAST ━━
    tint.lerp(wetBank, (1 - smooth(bank, .02, .65)) * .86);
    tint.lerp(beach, 1 - smooth(coast, 1.05, 4.0));
    tint.lerp(riverbed, Math.max(1 - smooth(bank, -.37, .02), 1 - smooth(coast, -.72, .10)));

    color.setXYZ(i, tint.r, tint.g, tint.b);
  }
}
