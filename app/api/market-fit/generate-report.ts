import PDFDocument from 'pdfkit'
import { PassThrough } from 'stream'

export interface MarketFitResults {
  formData: {
    businessName: string
    description: string
    problemExistence: {
      score: number | null
      selectedOption: number | null
    }
    activeSearch: {
      score: number | null
      selectedOption: number | null
    }
    willingnessToPay: {
      score: number | null
      selectedOption: number | null
    }
    reachability: {
      score: number | null
      selectedOption: number | null
    }
  }
  totalScore: number
  zone: {
    name: string
    color: string
    description: string
  }
  scores: {
    problemExistence: number
    activeSearch: number
    willingnessToPay: number
    reachability: number
  }
}

export async function generateMarketFitPDF(results: MarketFitResults) {
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
      .text('THE BLOOP MARKET-FIT MATRIX', { align: 'left' })

    doc.moveDown(0.5)
    doc
      .fontSize(12)
      .fillColor('#6b7280')
      .text('Are You Building Something People Actually Want?', { align: 'left' })

    doc.moveDown(1.5)

    // Business Info
    doc
      .font('Helvetica-Bold')
      .fontSize(16)
      .fillColor('#111827')
      .text('Your Business Idea')

    doc.moveDown(0.5)
    doc
      .font('Helvetica')
      .fontSize(12)
      .fillColor('#374151')
      .text(`Business/Product Name: ${results.formData.businessName || 'Not provided'}`)
      .text(`Description: ${results.formData.description || 'Not provided'}`)

    doc.moveDown(1)

    // Score Summary
    doc
      .font('Helvetica-Bold')
      .fontSize(18)
      .fillColor('#111827')
      .text('Your Assessment Results')

    doc.moveDown(0.5)
    doc
      .font('Helvetica-Bold')
      .fontSize(32)
      .fillColor('#dc2626')
      .text(`${results.totalScore} / 100`, { align: 'center' })

    doc.moveDown(0.3)
    doc
      .font('Helvetica-Bold')
      .fontSize(20)
      .fillColor('#dc2626')
      .text(results.zone.name, { align: 'center' })

    doc.moveDown(0.3)
    doc
      .font('Helvetica')
      .fontSize(14)
      .fillColor('#374151')
      .text(results.zone.description, { align: 'center' })

    doc.moveDown(1)

    // Score Breakdown
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text('Score Breakdown')

    doc.moveDown(0.4)
    doc.font('Helvetica').fillColor('#374151')
    doc.text(`Problem Existence: ${results.scores.problemExistence} / 25`)
    doc.text(`Active Search: ${results.scores.activeSearch} / 25`)
    doc.text(`Willingness to Pay: ${results.scores.willingnessToPay} / 25`)
    doc.text(`Reachability: ${results.scores.reachability} / 25`)

    doc.moveDown(1)

    // Recommendations based on zone
    const getRecommendations = () => {
      if (results.totalScore >= 70) {
        return {
          title: '🟢 GREEN ZONE: BUILD THIS NOW',
          description: 'Congratulations. You\'ve found a real problem with real demand. This is what product-market fit looks like before you build.',
          actions: [
            'Start building immediately (but keep it lean)',
            'Get to your first 10 customers ASAP',
            'Focus on speed to value (how fast can they see results?)',
            'Document everything you learn from early customers',
            'Don\'t over-engineer—launch fast, iterate faster'
          ]
        }
      } else if (results.totalScore >= 40) {
        const weakDimensions = []
        if (results.scores.problemExistence < 15) weakDimensions.push('Problem Existence')
        if (results.scores.activeSearch < 15) weakDimensions.push('Active Search')
        if (results.scores.willingnessToPay < 15) weakDimensions.push('Willingness to Pay')
        if (results.scores.reachability < 15) weakDimensions.push('Reachability')

        return {
          title: '🟡 YELLOW ZONE: TREAD CAREFULLY',
          description: 'You\'re missing one or two critical elements. This doesn\'t mean stop—it means fix what\'s broken first.',
          actions: [
            `Identify your weak dimension(s): ${weakDimensions.join(', ') || 'Review all dimensions'}`,
            'If Problem Existence is low: Validate the problem exists with more research',
            'If Active Search is low: People may not be aware they have this problem yet',
            'If Willingness to Pay is low: Find a different monetization angle or audience',
            'If Reachability is low: Rethink your distribution strategy',
            'Don\'t build yet—fix the gaps first'
          ]
        }
      } else {
        return {
          title: '🔴 RED ZONE: WALK AWAY (OR PIVOT HARD)',
          description: 'Hard truth: This idea, in its current form, is not ready. Building now will waste your time and money.',
          actions: [
            'Pause. Don\'t build anything yet.',
            'Go back to customer discovery—talk to 20-30 potential users',
            'Consider a significant pivot based on what you learn',
            'If multiple dimensions scored 0-10, consider a completely different idea',
            'Better to know now than after 6 months and $50K'
          ]
        }
      }
    }

    const recommendations = getRecommendations()

    doc.moveDown(1)
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text(recommendations.title)

    doc.moveDown(0.4)
    doc
      .font('Helvetica')
      .fillColor('#374151')
      .text(recommendations.description)

    doc.moveDown(0.5)
    doc
      .font('Helvetica-Bold')
      .fillColor('#111827')
      .text('What to do next:')

    doc.moveDown(0.3)
    doc.font('Helvetica').fillColor('#4b5563')
    recommendations.actions.forEach((action) => {
      doc.text(`• ${action}`)
    })

    doc.moveDown(1)

    // Score Breakdown
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#111827')
      .text('Score Breakdown')

    doc.moveDown(0.4)
    doc.font('Helvetica').fillColor('#374151')
    doc.text(`Problem Existence: ${results.scores.problemExistence} / 25`)
    doc.text(`Active Search: ${results.scores.activeSearch} / 25`)
    doc.text(`Willingness to Pay: ${results.scores.willingnessToPay} / 25`)
    doc.text(`Reachability: ${results.scores.reachability} / 25`)

    doc.moveDown(1)

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#6b7280')
      .text('Need help interpreting your results?', { align: 'center' })
    
    doc.moveDown(0.3)
    doc
      .fillColor('#6b7280')
      .text('Bloop Global | bloopglobal.com', { align: 'center' })
    
    doc.moveDown(0.3)
    doc
      .fillColor('#6b7280')
      .text('We turn ideas into businesses that actually work.', { align: 'center' })

    doc.end()
  })
}


