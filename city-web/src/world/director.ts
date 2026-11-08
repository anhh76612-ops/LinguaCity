/* "Đạo diễn" hoạt cảnh vào/ra công trình (M7, UC_15).

     city ──enter(code)──▶ entering ──xong──▶ inside ──exit()──▶ exiting ──xong──▶ city
                              │                                     │
                              └ emit BuildingEntered                └ emit BuildingExited

   enter(code):
     1. Avatar đi bộ (nhanh) tới cổng rồi tới cửa; camera bám theo và phóng to dần.
     2. Housing Lv ≥ 1: camera lao vào cửa + màn mờ → đổi sang cảnh nội thất 3D → avatar bước vào
     phòng.
        Công trình khác (và lô đất trống): dừng lại ở góc nhìn cận cảnh, app tự mở màn Compose.
   exit(): làm ngược lại rồi trả camera về đúng chỗ người chơi đang xem trước khi vào.

   Đạo diễn chỉ lo HÌNH ẢNH. Vào được hay không, vào để làm gì là việc của app
   (bản đồ không giữ nghiệp vụ). */
import * as THREE from 'three';
import { camera, placeCamera, scene, target } from '../core/renderer';
import { onUpdate, setView } from '../core/loop';
import type { BuildingCode } from './grid';
import { lotCenter } from './grid';
import type { City } from './city';
import type { Player } from '../people/player';
import type { InteriorView } from './interior/interiorView';
import { NODES, nearestNode, route } from '../people/nav';
import type { CityIntent } from '../bridge/cityState';

export type DirectorMode = 'city' | 'entering' | 'inside' | 'exiting';

/** Nút trên vỉa hè trước lối vào của từng lô (people/nav.ts). */
const GATE: Record<BuildingCode, string> = {
    HOUSING: 'HOUSING.gate', SCHOOL: 'SCHOOL.gate', PARK: 'PARK.gateZ', ROAD: 'ROAD.gate'
};

const FOLLOW_ZOOM = 2.3;   // phóng to khi bám theo avatar
const DOOR_ZOOM = 3.8;     // lao vào cửa
const FADE_MS = 320;
const WALK_SPEED = 2.4;    // đi nhanh hơn bình thường để người chơi không phải chờ lâu
const MAX_WALK_S = 3.5;    // công trình ở xa: tăng tốc để quãng đi bộ không quá ~3.5 giây

type CamGoal = { x: number; y: number; z: number; zoom: number; rate: number };

export class Director {
    mode: DirectorMode = 'city';
    building: BuildingCode | null = null;
    private saved = { target: new THREE.Vector3(), zoom: 1 };
    private goal: CamGoal | null = null;
    private follow = false;
    /** S2: đang đi bộ ngoài phố theo lệnh walkTo: camera trượt theo, không phóng to. */
    private stroll = false;
    private strollSeq = 0;
    private interiorShown = false;

    constructor(
        private city: City,
        private player: Player,
        private interior: InteriorView,
        private emit: (i: CityIntent) => void,
        private fadeEl: HTMLElement,
    ) {
        onUpdate((dt) => this.update(dt));
    }

    /** Kéo/zoom bản đồ chỉ khi đang ở thành phố và không có hoạt cảnh. */
    canPan(): boolean {
        return this.mode === 'city';
    }

    isIndoors(): boolean {
        return this.interiorShown;
    }

    async enter(code: BuildingCode): Promise<boolean> {
        if (this.mode !== 'city') {
            return false;
        }
        this.mode = 'entering';
        this.building = code;
        this.stroll = false;
        this.strollSeq++;
        this.saved.target.copy(target);
        this.saved.zoom = camera.zoom;
        this.player.busy = true;

        // 1) đi tới cổng rồi tới cửa, camera bám theo
        this.follow = true;
        const gate = NODES[GATE[code]];
        const path = route(
            nearestNode(this.player.x, this.player.z),
            GATE[code]
        ).map((id) => ({ x: NODES[id][0], z: NODES[id][1] }));
        const door = this.city.doorOf(code);
        if (door) {
            path.push(door);
        } else {
            path.push({ x: gate[0], z: gate[1] });
        }
        await this.player.walkTo(path, this.speedFor(path));
        this.follow = false;

        const indoor = code === 'HOUSING' && this.city.levelOf('HOUSING') >= 1;
        if (indoor && door) {
            // 2) lao vào cửa + màn mờ → đổi cảnh
            this.goal = { x: door.x, y: 0.8, z: door.z, zoom: DOOR_ZOOM, rate: 5 };
            this.player.visible = false;
            await this.fade(true);
            this.interiorShown = true;
            this.interior.active = true;
            setView(this.interior.scene, this.interior.camera);
            document.body.classList.add('indoor');
            await this.fade(false);
            await this.interior.walkIn();
        } else {
            // dừng ở góc nhìn cận cảnh của lô; có cửa thì avatar "bước vào" (ẩn đi)
            const c = lotCenter(code);
            this.goal = { x: c.x, y: 1, z: c.z, zoom: FOLLOW_ZOOM, rate: 4 };
            if (door) {
                this.player.visible = false;
            } else {
                this.player.act('idle', 999);
            }
            await wait(500);
        }
        this.mode = 'inside';
        this.emit({ type: 'BuildingEntered', buildingCode: code });
        return true;
    }

    /**
     * S2: người chơi đi bộ ngoài phố tới cổng một công trình (nút "Đi tới") hoặc tới một điểm
     * (chạm mặt đất). Camera trượt theo nhưng giữ độ phóng to. Lệnh mới thay lệnh đang chạy.
     * Tới cổng công trình thì báo PlayerArrived để app mở thông tin công trình đó.
     */
    async walkTo(dest: BuildingCode | { x: number; z: number }): Promise<boolean> {
        if (this.mode !== 'city') {
            return false;
        }
        const seq = ++this.strollSeq;
        const toNode = typeof dest === 'string' ? GATE[dest] : nearestNode(dest.x, dest.z);
        const path = route(nearestNode(this.player.x, this.player.z), toNode)
            .map((id) => ({ x: NODES[id][0], z: NODES[id][1] }));
        this.player.busy = true;
        this.stroll = true;
        await this.player.walkTo(path, this.speedFor(path));
        if (seq !== this.strollSeq || this.mode !== 'city') {
            return false; // đã có lệnh khác thay thế
        }
        this.stroll = false;
        this.player.busy = false;
        if (typeof dest === 'string') {
            this.player.act('wave', 1.2);
            this.emit({ type: 'PlayerArrived', buildingCode: dest });
        }
        return true;
    }

    /** Tốc độ đi bộ: tối thiểu WALK_SPEED, đường xa thì nhanh hơn để không quá MAX_WALK_S giây. */
    private speedFor(path: { x: number; z: number }[]): number {
        let len = 0, px = this.player.x, pz = this.player.z;
        for (const p of path) {
            len += Math.hypot(p.x - px, p.z - pz);
            px = p.x;
            pz = p.z;
        }
        return Math.max(WALK_SPEED, len / MAX_WALK_S);
    }

    async exit(): Promise<boolean> {
        if (this.mode !== 'inside' || !this.building) {
            return false;
        }
        const code = this.building;
        this.mode = 'exiting';

        if (this.interiorShown) {
            await this.interior.walkOut();
            await this.fade(true);
            this.interiorShown = false;
            this.interior.active = false;
            setView(scene, camera);
            document.body.classList.remove('indoor');
        }
        const door = this.city.doorOf(code);
        const gate = NODES[GATE[code]];
        if (door) {
            this.player.placeAt(door.x, door.z, 0);
        }
        this.player.visible = true;
        // camera lùi về chỗ cũ trong lúc avatar đi ra cổng
        this.goal = {
            x: this.saved.target.x, y: this.saved.target.y, z: this.saved.target.z,
            zoom: this.saved.zoom, rate: 3.2
        };
        await this.fade(false);
        await Promise.all([
            this.player.walkTo([{ x: gate[0], z: gate[1] }], WALK_SPEED),
            wait(700)
        ]);

        this.player.busy = false;
        this.player.act('wave', 1.2);
        this.mode = 'city';
        this.building = null;
        this.emit({ type: 'BuildingExited', buildingCode: code });
        return true;
    }

    private fade(on: boolean): Promise<void> {
        this.fadeEl.classList.toggle('on', on);
        return wait(FADE_MS);
    }

    private update(dt: number): void {
        if (this.follow) {
            this.goal = { x: this.player.x, y: 0.8, z: this.player.z, zoom: FOLLOW_ZOOM, rate: 3 };
        } else if (this.stroll) {
            this.goal = {
                x: this.player.x, y: target.y, z: this.player.z, zoom: camera.zoom, rate: 2.2
            };
        }
        const g = this.goal;
        if (!g) {
            return;
        }
        // nội suy mũ: nhanh lúc đầu, chậm dần, không phụ thuộc FPS
        const k = 1 - Math.exp(-dt * g.rate);
        target.x += (g.x - target.x) * k;
        target.y += (g.y - target.y) * k;
        target.z += (g.z - target.z) * k;
        camera.zoom += (g.zoom - camera.zoom) * k;
        camera.updateProjectionMatrix();
        placeCamera();
        const done = Math.abs(g.zoom - camera.zoom) < 0.002
            && target.distanceTo(new THREE.Vector3(g.x, g.y, g.z)) < 0.005;
        if (done && !this.follow && this.mode !== 'entering') {
            this.goal = null;
        }
    }
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
