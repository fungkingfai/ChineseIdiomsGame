/** Screen 介面：router 切換時呼叫 destroy() 清 timer / listener / overlay。 */

export interface Screen {
  el: HTMLElement;
  destroy(): void;
}
