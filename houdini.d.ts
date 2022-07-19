module globalThis {
  export type InputProperty = `--${string}`
  export interface PaintSize {
    width: number
    height: number
  }
  export interface CSSHasUnparsedValue {
    readonly length: 1
    [0]: string
  }
  export interface CSSNoneUnparsedValue {
    readonly length: 0
  }

  export type CSSUnparsedValue = CSSHasUnparsedValue | CSSNoneUnparsedValue

  export interface StylePropertyMapReadOnly {
    readonly size: number
    get(key: InputProperty): CSSUnparsedValue | null
  }
  export interface IPainter {
    paint(ctx: CanvasRenderingContext2D, size: number, props: Record<string, any>): void
  }
  export interface PaintConstructor {
    new(): IPainter
    inputProperties: InputProperty[]
  }
  export function registerPaint(name: string, paintWorklet: PaintConstructor)
}