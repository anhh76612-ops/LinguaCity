// Bảng màu dùng chung. Giữ một nơi duy nhất để cả thành phố "cùng tông":
// pastel, độ bão hoà vừa phải, vài điểm nhấn mạnh (mái đỏ, xe buýt vàng).
export const C = {
    grass: '#9fd486',
    grassDark: '#86c06c',
    dirt: '#b98a5e',
    dirtDark: '#8a6342',
    soil: '#d2b48c',
    road: '#5d6470',
    roadDirt: '#c9a37a',
    line: '#f4f1e8',
    sidewalk: '#e7dfd2',
    curb: '#cfc5b6',
    plaza: '#efe6d6',

    wallCream: '#f3e7d3',
    wallPeach: '#f2c9a8',
    wallMint: '#cfe7d6',
    wallSky: '#cfe0f0',
    wallBrick: '#d98c6a',
    wallWhite: '#f7f5f0',
    roofRed: '#d9654b',
    roofBlue: '#5f86b5',
    roofGreen: '#6aa36f',
    roofGray: '#8d96a3',
    trim: '#ffffff',
    wood: '#a8784d',
    woodDark: '#7a5534',
    glass: '#a9d6e5',
    door: '#8c5a3c',
    metal: '#9aa3ad',
    metalDark: '#5b6470',

    leaf: '#6fbf6a',
    leafDark: '#4f9d57',
    leafLight: '#93d27d',
    trunk: '#8b5e3c',
    flowerPink: '#f29bb8',
    flowerYellow: '#f7d35c',
    water: '#7cc6e6',
    sand: '#ecd9a6',

    busYellow: '#f4b740',
    carRed: '#e0604f',
    carBlue: '#5f8fd0',
    scaffold: '#e8a23a',
    crane: '#f2c14e',
} as const;

// Tông da / tóc / quần áo cho người dân (chọn ngẫu nhiên)
export const SKIN = ['#f9dcc4', '#f1c7a5', '#e3ad86', '#c98f66', '#9c6b4c'];
export const HAIR = ['#2b2522', '#4a3426', '#7a4b2a', '#c98a4b', '#e6c27a', '#5b6b8c', '#b05a6a'];
export const SHIRT = [
    '#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8', '#4db6ac', '#f06292', '#fff176',
    '#90a4ae'
];
export const PANTS = ['#455a64', '#5d4037', '#3949ab', '#6d4c41', '#37474f', '#8d6e63'];
