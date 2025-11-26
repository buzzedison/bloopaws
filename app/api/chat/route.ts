import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Bloop-specific context for the AI assistant
const BLOOP_CONTEXT = `You are a helpful AI assistant for Bloop Global, a business development and technology company.

About Bloop Global:
- We turn big ideas into businesses that actually work
- Services include: SaaS Development, Web Development, Mobile App Development, and AI Business Automation
- We help with business strategy, technical implementation, and securing funding
- We act as a technical co-founder for entrepreneurs and businesses
- Contact email: ask@bloopglobal.com
- Website: https://bloopglobal.com

Key Offerings:
1. SaaS Development - Custom SaaS platforms that generate measurable ROI
2. Web Development - Modern web applications that convert visitors into customers
3. Mobile App Development - Scalable mobile apps with great user engagement
4. AI Business Automation - AI-powered solutions to streamline operations
5. Business Courses & Training - Investment readiness, mental models, AI integration
6. Referral Program - Partners can earn commissions for successful referrals

Your Role:
- Answer questions about Bloop's services professionally and conversationally
- Help visitors understand how Bloop can help with their business ideas
- Qualify leads by understanding their needs
- Encourage visitors to book a consultation or email ask@bloopglobal.com
- Be friendly, helpful, and solution-oriented
- If asked about pricing, explain that it varies by project scope and encourage them to contact us for a custom quote

Tone: Professional but conversational, confident but not pushy, helpful and solution-focused.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Add system context to the conversation
    const messagesWithContext = [
      { role: 'system', content: BLOOP_CONTEXT },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective model, can upgrade to gpt-4o for better quality
      messages: messagesWithContext,
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    });

    const assistantMessage = completion.choices[0].message;

    return NextResponse.json({
      message: assistantMessage.content,
      role: assistantMessage.role,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured or invalid' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
