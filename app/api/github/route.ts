export async function POST(request: Request) {
    console.log(request.body)
    return Response.json({ message: 'Hello world' });
}
