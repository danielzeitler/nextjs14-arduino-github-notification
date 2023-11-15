export async function POST(req: any) {
    const data = await req.json();
    console.log("*******")
    console.log(data.context)
    console.log(data.description)
    console.log(data.state)
    console.log("*******")
    return Response.json({message: 'Hello world'});
}
