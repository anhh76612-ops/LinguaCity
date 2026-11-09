/* Mục 17: ngày/đêm theo giờ thật của máy (concept §5.5). Ban đêm trời navy, đèn yếu và ấm;
   bình minh/hoàng hôn trời cam. Thử nhanh trên trình duyệt: ?hour=21.
   Chỉ đổi ánh sáng và màu trời, không đổi nghiệp vụ. */
import * as THREE from 'three';
import { hemi, sun } from './renderer';

type Phase = 'day' | 'dusk' | 'night';

interface Look { sky: [string, string]; hemi: number; sun: number; sunColor: string }

const LOOKS: Record<Phase, Look> = {
    day: { sky: ['#bfe3f7', '#eaf6ff'], hemi: 1.6, sun: 2.3, sunColor: '#fff1dc' },
    dusk: { sky: ['#f6b48a', '#fde3c4'], hemi: 1.2, sun: 1.5, sunColor: '#ffb27a' },
    night: { sky: ['#1f2a44', '#3a4970'], hemi: 0.55, sun: 0.35, sunColor: '#9fb4ff' },
};

export function phaseAt(hour: number): Phase {
    if (hour >= 7 && hour < 17) return 'day';
    if ((hour >= 5 && hour < 7) || (hour >= 17 && hour < 19)) return 'dusk';
    return 'night';
}

function currentHour(): number {
    const forced = Number(new URLSearchParams(location.search).get('hour'));
    return Number.isFinite(forced) && forced > 0 ? forced : new Date().getHours();
}

export function applyDayNight(): Phase {
    const phase = phaseAt(currentHour());
    const look = LOOKS[phase];
    const root = document.documentElement.style;
    root.setProperty('--sky-top', look.sky[0]);
    root.setProperty('--sky-bottom', look.sky[1]);
    hemi.intensity = look.hemi;
    sun.intensity = look.sun;
    sun.color = new THREE.Color(look.sunColor);
    document.body.dataset.phase = phase;
    return phase;
}

/** Áp ngay và cập nhật mỗi phút. */
export function startDayNight(): void {
    applyDayNight();
    setInterval(applyDayNight, 60_000);
}
