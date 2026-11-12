import * as THREE from 'three';
import { bake, box, cyl, gableRoof, mat } from '../../city-web/src/core/shapes';

const silhouetteInk = new THREE.MeshBasicMaterial({ color: '#865c43' });

export function makeHouse(size, level, roofColor) {
  const group = new THREE.Group();
  const width = size * .67, depth = size * .63;
  const floors = level === 3 ? 2 : 1;
  const floor = 1.05, wall = '#f0d9ab', timber = '#89573d';
  const front = depth / 2, threshold = front + .02, doorWidth = .49;
  const wallHeight = floor * floors;
  const upper = level === 3;
  const roofY = wallHeight + .21;
  const roofDepth = depth + .36;
  box(group,width+.18,.12,depth+.19,'#aa9575',0,0,0);
  box(group,width,wallHeight,.12,wall,0,.12,-front);
  for (const sign of [-1,1]) {
    box(group,.12,wallHeight,depth,wall,sign * width / 2,.12,0);
    const sideWidth = (width - doorWidth) / 2;
    box(group,sideWidth,wallHeight,.12,wall,sign * (doorWidth + sideWidth) / 2,.12,front);
  }
  box(group,doorWidth,wallHeight-.75,.12,wall,0,.87,front);
  box(group,width,.1,depth,'#997352',0,wallHeight+.12,0);
  addRoof(group, width + .31, roofDepth, roofY, roofColor, upper);
  for (const side of [-1, 1]) {
    for (const z of [-front, front]) {
      box(group, .12, .10, .13, '#bb9c72', side * width / 2, .10, z);
      box(group, .095, wallHeight - .10, .095, '#bd956c', side * width / 2, .20, z);
    }
  }
  if (upper) {
    box(group, width + .11, .07, .095, '#be9b76', 0, floor + .10, front);
    for (const side of [-1, 1]) box(group, .075, .07, depth, '#be9b76', side * width / 2, floor + .10);
  }
  for (const x of [-doorWidth / 2, doorWidth / 2]) box(group,.065,.77,.09,timber,x,.12,threshold+.055);
  box(group,.59,.06,.1,timber,0,.87,threshold+.045);
  box(group,.76,.11,.28,'#d1bb95',0,.008,threshold+.14);
  box(group,.65,.052,.19,'#dccaab',0,.005,threshold+.34);
  box(group,.7,.008,Math.max(.1,size/2-front-.25),'#c1ad80',0,.004,(size/2+front+.25)/2);
  box(group,doorWidth,.72,.04,'#544435',0,.12,front-.31);
  const hinge = new THREE.Group();
  hinge.userData.dynamic = true;
  hinge.position.set(-doorWidth/2,.12,threshold+.055);
  box(hinge,doorWidth,.74,.057,timber,doorWidth/2);
  for (const x of [.12,.34]) box(hinge,.10,.55,.012,'#aa7652',x,.09,.033);
  box(hinge,.049,.042,.022,'#e5ba6b',.385,.32,.04);
  group.add(hinge);
  addPorch(group, threshold, upper);
  const lights = new THREE.MeshStandardMaterial({ color:'#ffca73', emissive:'#ffb04a', emissiveIntensity:.3 });
  const silhouettes = [];
  for (let level = 0; level < floors; level++) {
    const bottom = .40 + level * floor;
    for (const sign of [-1, 1]) {
      const wallX = sign * width / 2;
      box(group, .045, .43, .4, '#716746', wallX + sign * .08, bottom, -.10);
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(.31, .33), lights);
      glass.position.set(wallX + sign * .105, bottom + .214, -.10);
      glass.rotation.y = sign * Math.PI / 2;
      group.add(glass);
      box(group, .029, .35, .022, timber, wallX + sign * .119, bottom + .048, -.10);
      box(group, .12, .045, .45, '#a97b53', wallX + sign * .10, bottom - .023, -.10);
    }
    for (const x of [-width*.32,width*.32]) {
      box(group,.37,.43,.055,'#716746',x,bottom,front+.07);
      const glass=new THREE.Mesh(new THREE.PlaneGeometry(.28,.33),lights);
      glass.position.set(x,bottom+.214,front+.101);
      group.add(glass);
      const figure=new THREE.Group();
      figure.userData.dynamic = true;
      const head=new THREE.Mesh(new THREE.CircleGeometry(.037,8),silhouetteInk);
      head.position.y=.055;
      figure.add(head);
      box(figure,.087,.09,.001,'#865c43',0,-.065);
      figure.position.set(x,bottom+.16,front+.104);
      group.add(figure);
      silhouettes.push({figure,x});
      box(group,.022,.35,.029,'#936344',x,bottom+.048,front+.114);
      box(group,.3,.023,.029,'#936344',x,bottom+.212,front+.114);
      box(group,.43,.05,.12,'#a97b53',x,bottom-.025,front+.1);
      for (const side of [-1, 1]) {
        const shutter = box(group, .085, .37, .037, upper ? '#68816b' : '#946345',
          x + side * .21, bottom + .038, front + .09);
        shutter.rotation.y = side * .14;
        for (const y of [.10, .27]) {
          box(group, .086, .018, .043, upper ? '#9aab81' : '#b58157', x + side * .21, bottom + y, front + .10);
        }
      }
      if (level === 0) addPlanter(group, x, bottom - .105, front + .13);
    }
  }
  return { group: bake(group), hinge, lights, silhouettes, threshold, open: false };
}

function addRoof(group, width, depth, y, color, upper) {
  const height = upper ? .63 : .55;
  const halfDepth = depth / 2;
  const angle = Math.atan2(height, halfDepth);
  const darker = new THREE.Color(color).lerp(new THREE.Color('#795042'), .24).getStyle();
  const lighter = new THREE.Color(color).lerp(new THREE.Color('#f3c48a'), .28).getStyle();
  gableRoof(group, width, height, depth, color, 0, y);
  const ridge = cyl(group, .045, .049, width + .04, darker, 0, 0, 0, 8);
  ridge.position.y = y + height;
  ridge.rotation.z = Math.PI / 2;
  for (const side of [-1, 1]) {
    for (const x of [-width / 2, width / 2]) {
      const edge = box(group, .057, .057, Math.hypot(halfDepth, height), darker,
        x, y + height / 2 - .028, side * halfDepth / 2);
      edge.rotation.x = side * angle;
    }
    box(group, width + .06, .064, .058, darker, 0, y - .032, side * halfDepth);
    const rows = upper ? 4 : 3;
    for (let row = 1; row <= rows; row++) {
      const fraction = row / (rows + 1);
      const roofZ = side * halfDepth * fraction;
      const roofY = y + height * (1 - fraction);
      const seam = box(group, width - .14, .017, .026, darker, 0, roofY + .005, roofZ);
      seam.rotation.x = side * angle;
      for (const x of row % 2 ? [-.29, .18] : [-.12, .34]) {
        const tile = box(group, width * .20, .018, halfDepth * .11, lighter, width * x, roofY + .025, roofZ + .04 * side);
        tile.rotation.x = side * angle;
      }
    }
  }
  box(group, .23, .46, .25, '#a87557', width * .28, y + height * .56, -halfDepth * .33);
  box(group, .30, .065, .31, '#dbad82', width * .28, y + height * .56 + .46, -halfDepth * .33);
  box(group, .14, .012, .15, '#725342', width * .28, y + height * .56 + .524, -halfDepth * .33);
  if (upper) {
    const dormerX = -width * .16, dormerZ = halfDepth * .53, dormerY = y + height * .30;
    box(group, .42, .42, .46, '#e3c69e', dormerX, dormerY, dormerZ);
    box(group, .19, .23, .036, '#69776a', dormerX, dormerY + .108, dormerZ + .233);
    gableRoof(group, .55, .18, .52, darker, dormerX, dormerY + .42, dormerZ).rotation.y = Math.PI / 2;
  }
}

function addPorch(group, threshold, upper) {
  const roofWidth = upper ? .94 : .73;
  const awning = box(group, roofWidth, .075, .43, upper ? '#a76a4c' : '#aa7951', 0, .95, threshold + .19);
  awning.rotation.x = .16;
  if (upper) {
    for (const x of [-.41, .41]) box(group, .059, .83, .062, '#956f4d', x, .12, threshold + .34);
  }
  box(group, .16, .019, .06, '#7e5c41', -.35, .84, threshold + .096);
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(.071, .105, .071), mat('#edbc69', { emissive: '#b77937' }));
  lantern.position.set(-.35, .774, threshold + .116);
  group.add(lantern);
  box(group, .13, .045, .10, '#8b6949', -.35, .82, threshold + .11);
}

function addPlanter(group, x, y, z) {
  box(group, .37, .096, .13, '#976849', x, y, z);
  box(group, .31, .045, .10, '#77925e', x, y + .09, z);
  for (const offset of [-.10, 0, .10]) box(group, .045, .035, .045, '#ebba79', x + offset, y + .13, z);
}

export function animateHouse(house, dt, time, reduced) {
  const angle=house.open ? 1.21 : 0;
  house.hinge.rotation.y=reduced ? angle : THREE.MathUtils.damp(house.hinge.rotation.y,angle,12,dt);
  house.lights.emissiveIntensity=.34+(reduced ? 0 : Math.sin(time*1.9)*.08);
  house.silhouettes.forEach(({figure,x},index)=>{
    figure.position.x=x+(reduced ? 0 : Math.sin(time*.9+index*2.1)*.078);
    figure.visible=!reduced && Math.sin(time*.67+index*1.8) > -.32;
  });
}
