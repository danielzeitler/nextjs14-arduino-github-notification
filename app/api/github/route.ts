import mqtt from "mqtt";

export async function POST(req: any) {
    const data = await req.json();

    const client = mqtt.connect(process.env.URL ?? "", {
        username: process.env.USERNAME ?? "",
        password: process.env.PASSWORD ?? ""
    })

    client.on('connect', function () {
        if(data.starred_at) {
            console.log("published");
            client.publish('test/event', `${data.context}, ${data.description}, ${data.state}`);
        }
    });

    return Response.json({
        "message": "ok",
    })
}
