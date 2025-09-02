import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string;
    }>(req, process.env.SANITY_WEBHOOK_SECRET, true) // Added delay parameter

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate the content
    revalidateTag(body._type)

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body
    })
  } catch (error: any) {
    return new Response(error.message, { status: 500 })
  }
}