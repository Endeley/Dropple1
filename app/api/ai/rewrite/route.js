export async function POST(req) {
    const body = await req.json();
    const { mode = 'shorter', tone = 'Friendly', text = '' } = body || {};

    const suffix = {
        shorter: 'Shortened',
        longer: 'Expanded',
        professional: 'Professionalized',
        casual: 'Casualized',
        engaging: 'Made engaging',
        emotional: 'Made emotional',
    }[mode] || 'Rewritten';

    const output = `${suffix} (${tone}): ${text}`.trim();

    return Response.json({ output });
}
