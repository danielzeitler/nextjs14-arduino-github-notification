import {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import mqtt, {MqttClient, IClientOptions, IClientPublishOptions, IClientSubscribeOptions} from 'mqtt';

interface Message {
    topic: string;
    message: string;
}

const useMqtt = (brokerUrl: string, options?: IClientOptions) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const mqttClient = useRef<MqttClient | null>(null);

    const handleIncomingMessage = useCallback((topic: string, message: Buffer) => {
        const newMessage = {topic, message: message.toString()};
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }, []);

    // Connect to MQTT broker
    useEffect(() => {
        mqttClient.current = mqtt.connect(brokerUrl,  {
            username: process.env.USERNAME ?? "",
            password: process.env.PASSWORD ?? "",
        });

        mqttClient.current.on('connect', () => {
            setIsConnected(true);
        });

        mqttClient.current.on('message', handleIncomingMessage);

        return () => {
            mqttClient.current?.end();
        };
    }, [brokerUrl, handleIncomingMessage, options]);

    // Function to subscribe to a topic
    const subscribe = useCallback((topic: string, subscribeOptions?: IClientSubscribeOptions) => {
        console.log("subscribed");
        mqttClient.current?.subscribe(topic, subscribeOptions, (err) => {
            if (err) {
                console.error('Subscription error:', err);
            }
        });
    }, []);

    // Function to unsubscribe from a topic
    const unsubscribe = useCallback((topic: string) => {
        mqttClient.current?.unsubscribe(topic, (err) => {
            if (err) {
                console.error('Unsubscription error:', err);
            }
        });
    }, []);

    // Function to publish a message
    const publish = useCallback((topic: string, message: string, publishOptions?: IClientPublishOptions) => {
        mqttClient.current?.publish(topic, message, publishOptions);
    }, []);

    return {isConnected, messages, subscribe, unsubscribe, publish, mqttClient};
};

export default useMqtt;
