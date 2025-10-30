import PDFDocument from 'pdfkit'
import { PassThrough } from 'stream'

export interface DiagnosticResults {
  profile: string
  readiness: number
  urgency: string
  topNeeds: string[]
  approach: string
  recommendations: {
    title: string
    description: string
    action: string
    priority: 'high' | 'medium' | 'low'
  }[]
}

export async function generateDiagnosticPDF(results: DiagnosticResults) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
    const stream = new PassThrough()
    const chunks: Buffer[] = []

    doc.on('error', reject)
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))

    doc.pipe(stream)

    // Header
    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .fillColor('#dc2626')
      .text("Disruptor's Diagnostic", { align: 'left' })

    doc.moveDown(0.5)
    doc
      .fontSize(12)
      .fillColor('#6b7280')
      .text('Personalized Builder Report', { align: 'left' })

    doc.moveDown(1.5)

    // Summary section
    doc
      .font('Helvetica-Bold')
      .fontSize(16)
      .fillColor('#111827')
      .text('Your Snapshot')

    doc.moveDown(0.5)

    doc
      .font('Helvetica')
      .fontSize(12)
      .fillColor('#374151')
      .text(`Profile: ${results.profile}`)
      .text(`Readiness Score: ${results.readiness}%`)
      .text(`Priority Level: ${results.urgency.toUpperCase()}`)

    doc.moveDown(1)

    // Top needs
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text('Top Needs')

    doc.moveDown(0.4)

    doc.font('Helvetica').fillColor('#374151')
    results.topNeeds.forEach((need, index) => {
      doc.text(`${index + 1}. ${need}`)
    })

    doc.moveDown(1)

    // Approach
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text('Recommended Approach')

    doc.moveDown(0.4)
    doc
      .font('Helvetica')
      .fillColor('#374151')
      .text(results.approach, { align: 'left' })

    doc.moveDown(1)

    // Recommendations
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text('Your Roadmap (Next 4 Moves)')

    doc.moveDown(0.4)

    results.recommendations.forEach((rec, index) => {
      doc
        .font('Helvetica-Bold')
        .fillColor('#dc2626')
        .text(`${index + 1}. ${rec.title}`, { continued: false })

      doc
        .font('Helvetica')
        .fillColor('#4b5563')
        .text(rec.description)

      doc
        .fillColor('#111827')
        .font('Helvetica-Bold')
        .text('Next Step:', { continued: true })
        .font('Helvetica')
        .fillColor('#374151')
        .text(` ${rec.action}`)

      doc.moveDown(0.6)
    })

    doc.moveDown(1)

    doc
      .font('Helvetica')
      .fillColor('#6b7280')
      .text('Need help executing this plan? Book a strategy call at https://bloopglobal.com/contact')
    
    doc.moveDown(0.3)
    doc
      .fillColor('#6b7280')
      .text('Or reach out directly: ask@bloopglobal.com')

    doc.end()
  })
}
