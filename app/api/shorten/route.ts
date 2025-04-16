import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Url } from '@/app/lib/models/Url';

export async function POST(req:Request) {
    const { alias, url } = await req.json();
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection<Url>('urls').findOne({ alias });
    const urls = db.collection('urls');

    if (!existing) {
        await urls.insertOne({ alias, url });
        const baseUrl = process.env.HOST || 'http://localhost:3000';
        return NextResponse.json({ shortUrl: `${baseUrl}/${alias}` });
    }else{
        return NextResponse.json({ error: 'Alias already exists' }, { status: 409 });
    }
}