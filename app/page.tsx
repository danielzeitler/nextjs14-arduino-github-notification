"use client"
import {useEffect, useState} from "react";
import useMqtt from "@/hooks/useMqtt";

export default function Home() {
    const {
        isConnected,
        messages,
        publish,
        subscribe,
        unsubscribe
    } = useMqtt(process.env.NEXT_PUBLIC_URL ?? "");

    useEffect(() => {
        if (isConnected) {
            console.log("connected")
            subscribe('test/event');
        }

        return () => {
            if (isConnected) {
                unsubscribe('test/event');
            }
        };
    }, [isConnected, subscribe, unsubscribe]);

    return (
        <div>
            <div>hello world</div>
            <button onClick={() => publish('test/event', Math.random().toString(16))}>addMessage
            </button>

            <ul>
                {messages.map((message) => (
                    <li key={Math.random()}>{message.message}</li>
                ))}
            </ul>
        </div>
    );
}
