import mqtt from "mqtt";

export async function POST(req: any) {
    const data = await req.json();

    const client = mqtt.connect(process.env.NEXT_PUBLIC_URL ?? "", {
        username: process.env.NEXT_PUBLIC_USERNAME ?? "",
        password: process.env.NEXT_PUBLIC_PASSWORD ?? ""
    })

    client.on('connect', function () {
        if(data.starred_at) {
            console.log(`${data.context}, ${data.description}, ${data.state}`);
            client.publish('test/event', `${data.context}, ${data.description}, ${data.state}`);
        }
    });

    return Response.json({
        "message": "ok",
    })
}
