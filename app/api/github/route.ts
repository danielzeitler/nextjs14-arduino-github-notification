export async function POST(req: any) {
    const data = await req.json();
    console.log(data)
    return Response.json({message: 'Hello world'});
}
