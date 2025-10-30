declare module 'pdfkit' {
  import { Writable } from 'stream'

  interface PDFDocumentOptions {
    margin?: number
    size?: string | [number, number]
  }

  class PDFDocument extends Writable {
    constructor(options?: PDFDocumentOptions)
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T
    font(name: string): PDFDocument
    fontSize(size: number): PDFDocument
    fillColor(color: string): PDFDocument
    text(text: string, options?: { align?: 'left' | 'center' | 'right'; continued?: boolean }): PDFDocument
    moveDown(lines?: number): PDFDocument
    end(): void
  }

  export default PDFDocument
}
