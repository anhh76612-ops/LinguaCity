/* Cầu nối giữa bản đồ (JavaScript) và ứng dụng chủ.

   Chiều vào  (ứng dụng → bản đồ):  window.LinguaCity.setState(json)
                                   window.LinguaCity.enterBuilding(code) / exitBuilding()   (M7:
                                   hoạt cảnh vào/ra công trình)
     - Android: webView.evaluateJavascript("LinguaCity.setState('...')", null)
     - Web:     gọi trực tiếp hàm này

   Chiều ra   (bản đồ → ứng dụng):  emit(intent)
     - Android: một đối tượng Kotlin gắn bằng addJavascriptInterface(obj, "AndroidBridge"),
                có hàm @JavascriptInterface fun postMessage(json: String)
     - iOS:     window.webkit.messageHandlers.linguaCity.postMessage(json)
     - Web:     sự kiện DOM "linguacity:intent" (trang chủ lắng nghe bằng addEventListener)

   Bản đồ không biết mình đang chạy ở đâu: nó chỉ thử lần lượt các kênh trên. */
import { type CityIntent, type CityState, normalizeState } from './cityState';

interface NativeHost {
    AndroidBridge?: { postMessage(json: string): void };
    webkit?: { messageHandlers?: { linguaCity?: { postMessage(json: string): void } } };
}

const listeners = new Set<(i: CityIntent) => void>();

export function emit(intent: CityIntent): void {
    const json = JSON.stringify(intent);
    const host = window as unknown as NativeHost;
    try {
        host.AndroidBridge?.postMessage(json);
        host.webkit?.messageHandlers?.linguaCity?.postMessage(json);
    } catch (err) {
        console.error('[LinguaCity] gửi intent thất bại', err);
    }
    window.dispatchEvent(new CustomEvent('linguacity:intent', { detail: intent }));
    listeners.forEach((fn) => fn(intent));
    console.info('[LinguaCity] intent', intent);
}

/** Chạy trong app (có kênh native) hay chạy riêng trên trình duyệt? */
export function isEmbedded(): boolean {
    const host = window as unknown as NativeHost;
    return !!(host.AndroidBridge || host.webkit?.messageHandlers?.linguaCity);
}

/**
 * Lệnh hoạt cảnh (M7). Trả về false nếu không chạy được lúc này (đang có hoạt cảnh khác, mã lạ…).
 */
export interface CityCommands {
    enterBuilding?(code: unknown): boolean;
    exitBuilding?(): boolean;
}

/** Gắn API công khai lên window. apply: hàm vẽ lại thành phố khi có trạng thái mới. */
export function exposeApi(
    apply: (s: CityState) => void,
    current: () => CityState,
    commands: CityCommands = {}
): void {
    const api = {
        ...commands,
        /** Nhận CityState (chuỗi JSON hoặc object). Trả về true nếu hợp lệ. */
        setState(input: unknown): boolean {
            try {
                apply(normalizeState(input));
                return true;
            } catch (err) {
                console.error('[LinguaCity] CityState không hợp lệ', err);
                return false;
            }
        },
        getState: (): CityState => structuredClone(current()),
        onIntent(fn: (i: CityIntent) => void): () => void {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
    };
    (window as unknown as { LinguaCity: typeof api }).LinguaCity = api;
}
