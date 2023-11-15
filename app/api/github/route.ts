export async function POST(req: any) {
    const data = await req.json();
    console.log("*******")
    console.log(data)
    console.log("*******")
    return Response.json({message: 'Hello world'});
}
