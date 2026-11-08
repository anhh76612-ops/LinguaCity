// Dấu (!) của Sự kiện thành phố: một Sprite (tấm ảnh luôn quay mặt về camera) vẽ bằng canvas.
import * as THREE from 'three';

let texture: THREE.CanvasTexture | null = null;

function markerTexture(): THREE.CanvasTexture {
    if (texture) {
        return texture;
    }
    const s = 128, cv = document.createElement('canvas');
    cv.width = cv.height = s;
    const ctx = cv.getContext('2d')!;
    // bóng mờ + hình tròn vàng + viền trắng + chữ "!"
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#f4b740';
    ctx.beginPath();
    ctx.arc(s / 2, s / 2 - 4, s * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 76px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', s / 2, s / 2 - 1);
    texture = new THREE.CanvasTexture(cv);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

export function makeMarker(): THREE.Sprite {
    // depthTest: false → luôn vẽ đè lên trên, không bị nhà che: người chơi luôn thấy để chạm vào
    const m = new THREE.Sprite(new THREE.SpriteMaterial({
        map: markerTexture(), depthTest: false, transparent: true
    }));
    m.scale.setScalar(0.75);
    m.renderOrder = 10;
    return m;
}
