export default async (req) => {
  const apiKey = Netlify.env.get('ANTHROPIC_API_KEY');

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: { message: 'ANTHROPIC_API_KEY no configurado en Netlify' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body,
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: { message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const config = { path: '/api/scan' };
