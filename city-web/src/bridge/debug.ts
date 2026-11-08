// Bảng điều khiển thử nghiệm (lil-gui): đóng vai ứng dụng chủ khi chạy riêng trên trình duyệt.
// Mọi thay đổi ở đây đều đi qua đúng đường chính thức: window.LinguaCity.setState(...).
import GUI from 'lil-gui';
import { perf } from '../core/loop';
import { BUILDING_CODES, LOTS } from '../world/grid';
import { ACCESSORIES, type CityState, DEFAULT_APPEARANCE, DEFAULT_HOUSE_STYLE, FLOORS, HAIR_STYLES, MAX_LEVEL } from './cityState';

export interface DebugCommands { enter(code: string): boolean; exit(): boolean }

export function setupDebug(
    getState: () => CityState,
    setState: (s: CityState) => void,
    cmd?: DebugCommands
): GUI {
    const gui = new GUI({ title: 'CityState (giả lập)' });
    if (innerWidth < 900) {  // màn nhỏ: thu gọn để không che bản đồ
        gui.close();
    }

    const model: Record<string, number | boolean> = {};
    const push = () => {
        const s = getState();
        setState({
            ...s,
            buildings: BUILDING_CODES.map((code) => ({
                code,
                level: model[`${code}.level`] as number,
                upgrading: model[`${code}.upgrading`] as boolean,
                progress: model[`${code}.progress`] as number,
            })),
            events: s.events,
        });
    };

    for (const code of BUILDING_CODES) {
        const b = getState().buildings.find((x) => x.code === code)!;
        model[`${code}.level`] = b.level;
        model[`${code}.upgrading`] = !!b.upgrading;
        model[`${code}.progress`] = b.progress ?? 0;
        const f = gui.addFolder(`${LOTS[code].icon} ${LOTS[code].name}`);
        f.add(
            model,
            `${code}.level`,
            0,
            MAX_LEVEL,
            1
        ).name('Level (0 = chưa xây)').onFinishChange(push);
        f.add(model, `${code}.upgrading`).name('Đang nâng cấp').onChange(push);
        f.add(model, `${code}.progress`, 0, 1, 0.05).name('Tiến độ').onChange(push);
        if (code !== 'HOUSING') {
            f.close();
        }
    }

    let n = 1;
    const actions = {
        addEvent: () => {
            const s = getState();
            setState({
                ...s,
                events: [...s.events, { id: `evt-debug-${Date.now()}-${n++}`, kind: 'GRAMMAR' }]
            });
        },
        clearEvents: () => setState({ ...getState(), events: [] }),
    };
    const ev = gui.addFolder('Sự kiện (!)');
    ev.add(actions, 'addEvent').name('Thêm sự kiện');
    ev.add(actions, 'clearEvents').name('Xoá hết sự kiện');

    // Người chơi (M7): ngoại hình, kiểu nhà, vào/ra công trình — đi qua đúng API mà app dùng
    const look = { ...(getState().player?.appearance ?? DEFAULT_APPEARANCE) };
    const house = { ...(getState().houseStyle ?? DEFAULT_HOUSE_STYLE) };
    const pushLook = () => setState({
        ...getState(),
        player: { appearance: { ...look } },
        houseStyle: { ...house }
    });
    const pl = gui.addFolder('Người chơi (M7)');
    pl.addColor(look, 'skin').name('Da').onFinishChange(pushLook);
    pl.add(look, 'hairStyle', HAIR_STYLES).name('Kiểu tóc').onChange(pushLook);
    pl.addColor(look, 'hairColor').name('Màu tóc').onFinishChange(pushLook);
    pl.addColor(look, 'shirt').name('Áo').onFinishChange(pushLook);
    pl.addColor(look, 'pants').name('Quần').onFinishChange(pushLook);
    pl.add(look, 'accessory', ACCESSORIES).name('Phụ kiện').onChange(pushLook);
    pl.addColor(house, 'wall').name('Tường nhà').onFinishChange(pushLook);
    pl.add(house, 'floor', FLOORS).name('Sàn nhà').onChange(pushLook);
    if (cmd) {
        const go = { code: 'HOUSING', enter: () => cmd.enter(go.code), exit: () => cmd.exit() };
        pl.add(go, 'code', BUILDING_CODES).name('Công trình');
        pl.add(go, 'enter').name('enterBuilding()');
        pl.add(go, 'exit').name('exitBuilding()');
    }

    const stats = { fps: '', draw: '' };
    const pf = gui.addFolder('Hiệu năng');
    pf.add(stats, 'fps').name('FPS').disable().listen();
    pf.add(stats, 'draw').name('Lần vẽ / tam giác').disable().listen();
    setInterval(() => {
        stats.fps = String(perf.fps);
        stats.draw = `${perf.calls} / ${(perf.triangles / 1000).toFixed(1)}k`;
    }, 500);
    return gui;
}
