import { defineConfig } from 'vite';

// base './': mọi đường dẫn trong dist/ là tương đối, để bản build chạy được khi
// được chép vào assets của app Android/iOS hoặc mở từ một thư mục bất kỳ.
export default defineConfig({
    base: './',
    build: { target: 'es2020', chunkSizeWarningLimit: 900 },
});
