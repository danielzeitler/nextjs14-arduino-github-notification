import mqtt from "mqtt";

export async function GET(req: any) {
    const client = mqtt.connect('mqtt://broker.hivemq.com', {
        username: "test1",
        password: "Test1234"
    })

    client.on('connect', function () {
        console.log('Connected');
    });

    client.on('error', function (error) {
        console.log("error")
        console.log(error);
    });

    return Response.json({
        "message": "ok"
    })
}
