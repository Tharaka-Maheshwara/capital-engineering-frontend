// robots.txt route placeholder
export async function GET() {
  const txt = `User-agent: *\nDisallow:`;
  return new Response(txt, { headers: { "Content-Type": "text/plain" } });
}
