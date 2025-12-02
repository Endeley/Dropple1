import { NextResponse } from 'next/server';

// Placeholder text-to-layout parser. Replace with real LLM + vision model.
export async function POST(req) {
    const body = await req.json();
    const { prompt = '', referenceImage } = body || {};
    const lower = prompt.toLowerCase();

    // Simple intent matching
    const heroMatch = lower.includes('hero');
    const pricingMatch = lower.includes('pricing');
    const gridMatch = lower.includes('grid') || lower.includes('3-column') || lower.includes('3 column');

    let layout;
    if (pricingMatch || gridMatch) {
        layout = {
            type: 'frame',
            direction: 'column',
            spacing: 20,
            padding: { top: 48, right: 48, bottom: 48, left: 48 },
            children: [
                { type: 'text', role: 'headline', content: 'Pricing Plans' },
                {
                    type: 'frame',
                    direction: 'row',
                    spacing: 16,
                    children: [
                        { type: 'card', title: 'Starter', price: '$12', cta: 'Choose' },
                        { type: 'card', title: 'Pro', price: '$24', cta: 'Choose' },
                        { type: 'card', title: 'Team', price: '$48', cta: 'Choose' },
                    ],
                },
            ],
        };
    } else if (heroMatch) {
        layout = {
            type: 'frame',
            direction: 'row',
            spacing: 40,
            padding: { top: 64, right: 64, bottom: 64, left: 64 },
            children: [
                {
                    type: 'frame',
                    direction: 'column',
                    spacing: 16,
                    children: [
                        { type: 'text', role: 'headline', content: 'Your Headline Here' },
                        { type: 'text', role: 'subtext', content: 'Subheading goes here' },
                        {
                            type: 'frame',
                            direction: 'row',
                            spacing: 12,
                            children: [
                                { type: 'button', label: 'Get Started' },
                                { type: 'button', label: 'Learn More', variant: 'ghost' },
                            ],
                        },
                    ],
                },
                { type: 'image', placeholder: true },
            ],
        };
    } else {
        layout = {
            type: 'frame',
            direction: 'column',
            spacing: 20,
            padding: { top: 48, right: 48, bottom: 48, left: 48 },
            children: [
                { type: 'text', role: 'headline', content: 'Generated Layout' },
                { type: 'text', role: 'subtext', content: prompt || 'Describe your layout' },
                { type: 'button', label: 'Primary Action' },
            ],
        };
    }

    return NextResponse.json({
        layout,
        referenceImage,
    });
}
