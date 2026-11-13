import * as THREE from 'three';
import { bake, box, disposeGroup, mat, seeded } from '../city-web/src/core/shapes';
import { makeChibi, randomLook } from '../city-web/src/people/chibi';
import { applyPose, poseFor, restPose } from '../city-web/src/people/poses';
import { makeCar } from '../city-web/src/world/buildings/road';
import { bench, flowerBed } from '../city-web/src/world/buildings/common';
import { buildHouseInterior, DOOR, WALKABLE } from '../city-web/src/world/interior/house';
import { DEFAULT_HOUSE_STYLE } from '../city-web/src/bridge/cityState';
import { makeAnnex } from './models/annex';
import { makeBasketballCourt } from './models/basketball-court';
import { makeChapel } from './models/chapel';
import { makeConstruction } from './models/construction';
import { animateHouse, makeHouse } from './models/house';
import { makeSchool } from './models/school';
import { makeTimberLodge } from './models/timber-lodge';
import { makeTree } from './models/trees';
import { makeVilla } from './models/villa';

const model = window.TownModel;
const grass = '#a4b86a';
const roadColors = { dirt: ['#c59b65', '#dfbc82'], stone: ['#b1a798', '#d2c6ae'], asphalt: ['#6b7171', '#b8aa91'] };
const random = seeded(56);
const foliage = new THREE.IcosahedronGeometry(1, 0);

function rock(parent, x, y, z, scale, color) {
  const mesh = new THREE.Mesh(foliage.clone(), mat(color));
  mesh.position.set(x, y, z);
  mesh.scale.set(scale, scale * .68, scale * .88);
  mesh.rotation.y = random() * 6;
  mesh.castShadow = mesh.receiveShadow = true;
  parent.add(mesh);
}

function addTree(parent, x, z, size, kind) {
  const tree = makeTree(kind, size, x * .81 + z * .57);
  tree.position.set(x, 0, z);
  parent.add(tree);
}

function ribbon(parent, width, y, color) {
  const vertices = [], indices = [];
  for (let index = 0; index <= 70; index++) {
    const z = -32 + index;
    const x = model.riverX(z);
    vertices.push(x - width, y, z, x + width, y, z);
    if (index) {
      const a = index * 2;
      indices.push(a - 2, a, a - 1, a - 1, a, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const strip = new THREE.Mesh(geometry, mat(color));
  strip.receiveShadow = true;
  parent.add(strip);
}

function landscape() {
  const ground = new THREE.Group();
  const surface = new THREE.Group();
  box(ground, 85, .2, 85, grass, 0, -.23, 0).castShadow = false;
  const turf = ['#a4b86a','#a5b96b','#a6ba6c','#a3b769'];
  for (let x = -18; x < 18; x++) {
    for (let z = -12; z < 12; z++) {
      box(surface, 1, .025, 1, turf[Math.floor(random() * turf.length)], x + .5, -.026, z + .5);
    }
  }
  ribbon(surface, 1.14, .013, '#b59a66');
  ribbon(surface, .98, .025, '#62a5b7');
  ribbon(surface, .68, .032, '#70b1c4');
  for (let index = 0; index < 45; index++) {
    const z = index * .65 - 14.3;
    const sign = index % 2 ? 1 : -1;
    const x = model.riverX(z) + sign * (1.1 + random() * .27);
    rock(ground, x, .13, z, .13 + random() * .29, ['#bcb09a','#a5a295','#d5c6a9'][index % 3]);
  }
  for (const [z, offset, size, kind] of [
    [-12.4, -2.45, 1.05, 'spruce'], [-11.25, -1.91, .65, 'fern'], [-10.8, -3.15, .91, 'pine'],
    [-9.2, -2.02, .88, 'birch'], [-8.7, -3.35, .92, 'golden'], [-7.35, -1.94, .61, 'bush'],
    [-6.55, -3.0, 1.09, 'oak'], [-4.9, -1.91, .71, 'rosette'], [-4.55, -3.22, .93, 'spruce'],
    [-2.7, -2.07, .97, 'broadleaf'], [-1.35, -2.72, .81, 'pine'], [.03, -2.01, .62, 'fern'],
    [1.12, -2.31, .92, 'poplar'], [1.78, -3.58, 1.07, 'oak'], [3.55, -2.10, .78, 'bush'],
    [4.76, -2.30, .97, 'umbrella'], [5.95, -3.04, .86, 'spruce'], [6.85, -1.85, .65, 'fern'],
    [8.02, -2.28, 1.04, 'birch'], [9.57, -2.62, .94, 'golden'], [10.5, -1.78, .51, 'rosette'],
    [-11.6, 1.88, .93, 'broadleaf'], [-8.4, 1.90, .65, 'bush'], [-6.22, 1.90, .57, 'rosette'],
    [-3.66, 1.96, .70, 'cypress'], [-1.85, 1.86, .56, 'fern'], [1.47, 1.96, .57, 'fern'],
    [4.05, 1.82, .72, 'rosette'], [8.2, 2.02, .86, 'pine'], [10.74, 1.82, .65, 'fern'],
  ]) {
    addTree(ground, model.riverX(z) + offset, z, size, kind);
  }
  for (const [x, z, size, kind] of [
    [-8.1, -10.8, 1.04, 'spruce'], [-6.2, -10.9, .72, 'pine'], [-4.65, -10.1, .51, 'shrub'],
    [-3, -11.2, .99, 'golden'], [-1.15, -10.3, .55, 'bush'], [1, -11.1, .91, 'poplar'],
    [2.37, -10.1, .50, 'rosette'], [7.8, -11.15, .94, 'oak'], [9.4, -10.4, .57, 'spruce'],
    [10.8, -11.5, 1.13, 'pine'], [12.3, -10.53, .61, 'birch'], [14.8, -8.45, 1.13, 'spruce'],
    [15.8, -6.83, .76, 'pine'], [14.68, -4.55, .92, 'broadleaf'], [15.9, -2.95, .77, 'cypress'],
    [15.1, 1.7, .55, 'shrub'], [15.1, 3.65, 1.04, 'amber'], [14.8, 5.23, .65, 'poplar'],
    [14.5, 6.6, .47, 'fern'], [13.3, 8.45, .70, 'golden'], [11.7, 9.8, 1.15, 'umbrella'],
    [10.0, 8.95, .72, 'oak'], [8.54, 8.35, .41, 'rosette'], [.8, 10.5, .92, 'pine'],
    [-.65, 9.17, .81, 'spruce'], [-1.74, 10.25, .56, 'bush'], [-8.05, 9.42, 1.1, 'amber'],
    [-3.35, 3.14, 1.20, 'umbrella'], [-4.24, 5.13, .92, 'oak'], [-2.15, 5.38, .58, 'shrub'],
    [-3.21, 5.58, .56, 'fern'], [-4.65, 2.40, .52, 'rosette'], [-4.53, 3.43, .62, 'bush'],
    [-1.46, 2.42, .51, 'shrub'], [9.65, -1.42, 1.02, 'amber'], [-10.7, 2.75, .79, 'palm'],
    [11.85, 6.35, .74, 'cypress'], [10.88, 6.35, .60, 'cypress'], [5.45, -5.9, .63, 'birch'],
  ]) {
    addTree(ground, x, z, size, kind);
  }
  bench(ground,-2.6,4.6,Math.PI * .12);
  flowerBed(ground,-2.2,3.3,1,.65,'#f0cb70');
  bench(ground,7.5,4.7,Math.PI);
  box(ground,.09,1,.09,'#7b6040',7,0,4.2);
  box(ground,.43,.38,.07,'#7dabbc',7,.78,4.2);
  bake(ground);
  bake(surface).traverse(mesh => { mesh.castShadow = false; });
  ground.add(surface);
  return ground;
}

function residentYard(lot, index) {
  const yard = new THREE.Group();
  const fence = '#b49368';
  for (const x of [-1.33, -.91, .91, 1.33]) {
    box(yard, .085, .28, .085, fence, x, .015, 1.38);
  }
  for (const x of [-1.12, 1.12]) {
    box(yard, .49, .06, .045, fence, x, .10, 1.38);
    box(yard, .49, .06, .045, fence, x, .20, 1.38);
  }
  if (index !== 1) flowerBed(yard, -1.05, .54, .36, .62, index ? '#dbae52' : '#dfab89');
  placeOnLot(yard, lot);
  return bake(yard);
}

function placeOnLot(group, lot) {
  const size = lot.size ?? model.footprint(lot);
  group.position.set(lot.x+size/2,0,lot.z+size/2);
  group.rotation.y=(lot.rotation ?? 0)*Math.PI/2;
}

function actor(look, destination, speed) {
  const rig = makeChibi(look);
  rig.root.position.set(destination.x,.02,destination.z);
  return { rig, pose:restPose(), path:[], onArrive:null, stride:0, speed };
}

function walk(character, path, onArrive = null) {
  character.path = path;
  character.onArrive = onArrive;
}

function advance(character, dt, time, reduced) {
  const position = character.rig.root.position;
  let budget = dt*character.speed;
  const moving = character.path.length>0;
  while (character.path.length && budget>0) {
    const next=character.path[0];
    const dx=next.x-position.x, dz=next.z-position.z;
    const distance=Math.hypot(dx,dz);
    if(distance>.001) character.rig.root.rotation.y=Math.atan2(dx,dz);
    if(distance<=budget) {
      position.x=next.x;
      position.z=next.z;
      budget-=distance;
      character.stride+=distance*12;
      character.path.shift();
    } else {
      position.x+=dx/distance*budget;
      position.z+=dz/distance*budget;
      character.stride+=budget*12;
      budget=0;
    }
  }
  const animation=moving && !reduced ? 'walk' : 'idle';
  applyPose(character.rig,character.pose,poseFor(animation,reduced ? 0 : time,character.stride,0),dt,false);
  if(!character.path.length && character.onArrive) {
    const callback=character.onArrive;
    character.onArrive=null;
    callback();
  }
}

function roadGroup(roads) {
  const group=new THREE.Group();
  for(const cell of roads.values()) {
    const [color,edge]=roadColors[cell.material];
    const {x,z}=model.center(cell);
    const neighbors=model.directions.map(([dx,dz])=>roads.has(model.key({x:cell.x+dx,z:cell.z+dz})));
    box(group,1,.024,1,edge,x,.002,z).castShadow=false;
    const [east,south,west,north]=neighbors;
    const width=.83+.085*(Number(east)+Number(west));
    const depth=.83+.085*(Number(south)+Number(north));
    box(group,width,.013,depth,color,
      x+.0425*(Number(east)-Number(west)),.026,z+.0425*(Number(south)-Number(north))).castShadow=false;
    if(cell.material==='stone') {
      box(group,.8,.003,.024,'#8e887c',x,.041,z-.21).castShadow=false;
      box(group,.8,.003,.024,'#8e887c',x,.041,z+.21).castShadow=false;
      box(group,.022,.003,.4,'#8e887c',x+.16,.041,z).castShadow=false;
    } else if(cell.material==='asphalt' && neighbors.filter(Boolean).length<3) {
      const cross=east||west;
      box(group,cross ? .43 : .039,.003,cross ? .039 : .43,'#f4e8c8',x,.041,z).castShadow=false;
    }
  }
  bake(group).traverse(mesh => { mesh.castShadow = false; });
  return group;
}

function addLights(scene) {
  scene.add(new THREE.HemisphereLight('#ffedcf','#78966f',2.25));
  const sun=new THREE.DirectionalLight('#fff0cc',2.05);
  sun.position.set(-9,18,9);
  sun.castShadow=true;
  sun.shadow.mapSize.set(1024,1024);
  Object.assign(sun.shadow.camera,{left:-24,right:24,top:21,bottom:-21,near:1,far:65});
  sun.shadow.normalBias=.028;
  scene.add(sun);
}

export function create(canvas,label,fade) {
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  const town=new THREE.Scene(), inside=new THREE.Scene();
  town.background=new THREE.Color(grass);
  inside.background=new THREE.Color('#9daf80');
  addLights(town);
  addLights(inside);
  town.add(landscape());
  const room=buildHouseInterior(DEFAULT_HOUSE_STYLE).group;
  box(room,1.15,.34,1.7,'#a97853',-2.15,0,-1.17);
  box(room,1.09,.15,1.55,'#72946c',-2.15,.34,-1.17);
  box(room,1.04,.13,.39,'#f4e6c5',-2.15,.49,-1.73);
  box(room,.95,.65,.54,'#b18356',2.4,0,-1.65);
  inside.add(room);
  const camera=new THREE.OrthographicCamera(), roomCamera=new THREE.OrthographicCamera();
  const look={skin:'#ecc49a',hair:'#624433',shirt:'#4c79ac',pants:'#473e3d',style:'short',accessory:'hat',bag:false};
  const mayor=actor(look,{x:1.5,z:.5},3.5);
  const roomMayor=actor(look,DOOR,2.5);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.26,.31,28).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:'#ffde81',side:THREE.DoubleSide}));
  ring.position.y=.015;
  mayor.rig.root.add(ring);
  town.add(mayor.rig.root);
  inside.add(roomMayor.rig.root);

  const residents=model.residents.map((lot,index)=>{
    const home=makeHouse(lot.size,1,['#b87954','#828f58','#c99a5d'][index]);
    placeOnLot(home.group,lot);
    town.add(home.group, residentYard(lot,index));
    const gate=model.doorPoint(lot,lot.size/2+.42);
    const entry=model.doorPoint(lot,home.threshold-.15);
    const citizen=actor(randomLook(random),gate,1.5+index*.12);
    town.add(citizen.rig.root);
    return {home,citizen,gate,entry,visit:{x:[-5.5,1.5,-6.5][index],z:[-1.5,1.5,6.5][index]},
      phase:'out',ready:1+index*1.8};
  });
  for (const [lot, createModel] of [
    [model.school, makeSchool], [model.court, makeBasketballCourt], [model.annex, makeAnnex],
    [model.lodge, makeTimberLodge], [model.villa, makeVilla], [model.chapel, makeChapel],
    [model.construction, makeConstruction],
  ]) {
    const building = createModel(lot.size);
    placeOnLot(building, lot);
    town.add(building);
  }
  const cars=['#5f92b3','#d1ad5a'].map(color=>{
    const car=makeCar(color);
    car.scale.setScalar(.65);
    town.add(car);
    return car;
  });
  const grid=new THREE.GridHelper(5,5,0xf1eed2,0xf1eed2);
  grid.material.transparent=true;
  grid.material.opacity=.55;
  town.add(grid);
  const lotMark=new THREE.Mesh(new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xa3d580,transparent:true,opacity:.28,depthWrite:false}));
  lotMark.position.y=.052;
  town.add(lotMark);

  const ray=new THREE.Raycaster(), plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
  const mapTarget = new THREE.Vector3(-.35, 0, -.8);
  const doorTarget = new THREE.Vector3();
  const cameraTarget = mapTarget.clone();
  const cameraOffset = new THREE.Vector3(28.35, 28, 28.8);
  let approach = 0;
  let phase='town', transition=null, cameraTime=0, previous=0, nextPhase=()=>{};
  let house=null, lotId='', shownLot=null, roadsMesh=null, revision=-1, track=[], drive=0;
  let committedLot = null;

  function resize() {
    const {width,height}=canvas.getBoundingClientRect();
    renderer.setSize(Math.max(1,width),Math.max(1,height),false);
    for(const [cam,span] of [[camera,23.5],[roomCamera,8.4]]) {
      const half=span/2, aspect=width/Math.max(1,height);
      Object.assign(cam,{left:-half*aspect,right:half*aspect,top:half,bottom:-half,near:.1,far:170});
      cam.updateProjectionMatrix();
    }
  }

  function changePhase(next) { phase=next; nextPhase(next); }

  function setLot(lot,draft) {
    const id=`${lot.x},${lot.z},${lot.level},${lot.rotation},${draft}`;
    if(id===lotId)return;
    if(house) {
      disposeGroup(house.group);
      house.lights?.dispose();
    }
    const size=model.footprint(lot);
    if(lot.level) house=makeHouse(size,lot.level,'#bc7652');
    else {
      const group=new THREE.Group();
      box(group,size-.15,.032,size-.15,'#c4a26e');
      for(const x of [-1.32,1.32]) for(const z of [-1.32,1.32]) box(group,.105,.45,.105,'#9e744e',x,0,z);
      for(let index=0;index<3;index++) box(group,.92,.11,.1,'#a97d54',.52,.04,-.28+index*.16);
      house={group};
    }
    placeOnLot(house.group,lot);
    shownLot=lot;
    lotId=id;
    town.add(house.group);
  }

  function pointAt(event) {
    const bounds=canvas.getBoundingClientRect();
    ray.setFromCamera(new THREE.Vector2((event.clientX-bounds.left)/bounds.width*2-1,
      -(event.clientY-bounds.top)/bounds.height*2+1),phase==='inside' ? roomCamera : camera);
    return ray.ray.intersectPlane(plane,new THREE.Vector3());
  }

  function hitHouse() { return phase==='town' && house && ray.intersectObject(house.group,true).length>0; }

  function move(point,state) {
    if(phase==='inside') {
      walk(roomMayor,[{x:THREE.MathUtils.clamp(point.x,WALKABLE.minX,WALKABLE.maxX),z:THREE.MathUtils.clamp(point.z,WALKABLE.minZ,WALKABLE.maxZ)}]);
      return true;
    }
    if(phase!=='town')return false;
    const path=model.route(mayor.rig.root.position,point,state.house);
    if(path)walk(mayor,path);
    return !!path;
  }

  function enter(state) {
    if(phase!=='town' || !shownLot?.level)return false;
    const gate=model.doorPoint(shownLot,model.footprint(shownLot)/2+.42);
    const path=model.route(mayor.rig.root.position,gate,state.house);
    if(!path)return false;
    changePhase('entering');
    walk(mayor,path,()=>{
      house.open=true;
      transition={at:cameraTime+.43,run:()=>walk(mayor,[model.doorPoint(shownLot,house.threshold-.15)],()=>{
        fade.classList.add('covered');
        transition={at:cameraTime+.24,run:()=>{
          house.open=false;
          roomMayor.rig.root.position.set(DOOR.x,.04,DOOR.z);
          walk(roomMayor,[{x:0,z:.85}]);
          changePhase('inside');
          fade.classList.remove('covered');
        }};
      })};
    });
    return true;
  }

  function leave() {
    if(phase!=='inside')return;
    changePhase('leaving');
    walk(roomMayor,[DOOR],()=>{
      fade.classList.add('covered');
      transition={at:cameraTime+.24,run:()=>{
        house.open=true;
        const gate=model.doorPoint(shownLot,model.footprint(shownLot)/2+.42);
        walk(mayor,[gate],()=>{house.open=false;changePhase('town');});
        changePhase('returning');
        fade.classList.remove('covered');
      }};
    });
  }

  function tickResident(resident,state,time,dt,reduced) {
    const {citizen,home,gate,entry,visit}=resident;
    animateHouse(home,dt,time,reduced);
    if(citizen.rig.root.visible)advance(citizen,dt,time,reduced);
    if(time<resident.ready || citizen.path.length || citizen.onArrive)return;
    if(resident.phase==='inside') {
      home.open=true;
      resident.phase='exiting';
      resident.ready=time+.38;
    } else if(resident.phase==='exiting') {
      citizen.rig.root.visible=true;
      walk(citizen,[gate],()=>{home.open=false;resident.phase='out';resident.ready=cameraTime+1.5;});
    } else if(resident.phase==='at-door') {
      walk(citizen,[entry],()=>{citizen.rig.root.visible=false;home.open=false;resident.phase='inside';resident.ready=cameraTime+2.9;});
    } else {
      const goingOut=resident.phase==='out';
      const path=model.route(citizen.rig.root.position,goingOut ? visit : gate,state.house);
      if(!path){resident.ready=time+2;return;}
      walk(citizen,path,()=>{
        resident.phase=goingOut ? 'return' : 'at-door';
        if(!goingOut)home.open=true;
        resident.ready=cameraTime+(goingOut ? 2.3 : .38);
      });
    }
  }

  function draw(state,timeMs,reduced) {
    const time=timeMs/1000, dt=previous ? Math.min(.05,time-previous) : 0;
    previous=time;
    cameraTime=time;
    if(transition && time>=transition.at) {
      const action=transition.run;
      transition=null;
      action();
    }
    if(revision!==state.roadRevision) {
      if(roadsMesh)disposeGroup(roadsMesh);
      roadsMesh=roadGroup(state.roads);
      town.add(roadsMesh);
      track=model.trafficRoute(state.roads);
      revision=state.roadRevision;
    }
    setLot(state.draft??state.house,state.mode==='place');
    if (committedLot !== state.house) {
      committedLot = state.house;
      const free = model.openCellNear(mayor.rig.root.position, committedLot);
      if (free) mayor.rig.root.position.set(free.x, .02, free.z);
      const destination = mayor.path.at(-1);
      if (destination) walk(mayor, model.route(mayor.rig.root.position, destination, committedLot) ?? []);
    }
    const amount=reduced || phase!=='town' ? 0 : model.pressAmount(state.press,timeMs);
    const pulse=state.selected && !reduced && phase==='town' ? 1+.012*Math.sin(time*5) : 1;
    house.group.position.y=-amount*.084;
    house.group.scale.set(pulse+amount*.04,1,pulse+amount*.04);
    if(house.hinge)animateHouse(house,dt,time,reduced);
    residents.forEach(resident=>tickResident(resident,state,time,dt,reduced));
    drive+=dt*2.2;
    cars.forEach((car,index)=>{
      const length=track.length-1;
      car.visible=length>1;
      if(!car.visible)return;
      const progress=(drive+index*length)%(length*2);
      const forward=progress<length;
      const offset=forward ? progress : 2*length-progress;
      const segment=Math.min(length-1,Math.floor(offset));
      const a=track[segment], b=track[segment+1], fraction=offset-segment;
      const dx=(b.x-a.x)*(forward?1:-1), dz=(b.z-a.z)*(forward?1:-1);
      car.position.set(THREE.MathUtils.lerp(a.x,b.x,fraction)+dz*.14,.04,THREE.MathUtils.lerp(a.z,b.z,fraction)-dx*.14);
      car.rotation.y=Math.atan2(dx,dz);
    });
    const inRoom=phase==='inside'||phase==='leaving';
    advance(inRoom ? roomMayor : mayor,dt,time,reduced);
    const focus=state.draft??state.hover;
    grid.visible=phase==='town' && !!focus && state.mode!=='inspect';
    if(grid.visible)grid.position.set(focus.x+1.5,.064,focus.z+1.5);
    lotMark.visible=grid.visible || (phase==='town' && state.selected);
    if(lotMark.visible) {
      const target=grid.visible ? focus : state.house;
      const size=state.mode==='road' ? 1 : model.footprint(target);
      lotMark.position.set(target.x+size/2,.055,target.z+size/2);
      lotMark.scale.set(size,1,size);
      const error=state.mode==='place' ? model.placementError(target,state.roads) : state.mode==='road' && model.roadError(target,state.house,state.material);
      lotMark.material.color.set(error?'#b75143':'#def3a1');
    }
    const atDoor = (phase === 'entering' && house.open) || inRoom || phase === 'returning';
    approach = reduced ? 0 : THREE.MathUtils.damp(approach, atDoor ? 1 : 0, atDoor ? 5 : 10, dt);
    doorTarget.copy(house.group.position).y = .75;
    cameraTarget.copy(mapTarget).lerp(doorTarget, approach * .65);
    camera.position.copy(cameraTarget).add(cameraOffset);
    camera.lookAt(cameraTarget);
    camera.zoom = 1 + approach * .48;
    camera.updateProjectionMatrix();
    roomCamera.position.set(10,10,10);
    roomCamera.lookAt(0,.6,0);
    renderer.render(inRoom?inside:town,inRoom?roomCamera:camera);
    if(state.selected && phase==='town') {
      const labelHeight = shownLot.level === 3 ? 3.4 : shownLot.level ? 2.2 : .52;
      const point = house.group.position.clone().add(new THREE.Vector3(0, labelHeight, 0)).project(camera);
      label.style.left=`${(point.x+1)*50}%`;
      label.style.top=`${Math.max(7,(1-point.y)*50)}%`;
    }
  }

  return {resize,draw,pointAt,hitHouse,move,enter,leave,onPhase(callback){nextPhase=callback;},get phase(){return phase;}};
}
