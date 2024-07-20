import get from "lodash.get";

import { YoutubeApiResponse } from "@/types/YoutubeApiResponse";

export async function GET(request: Request) {
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = new URL("/youtube/v3/channels", "https://www.googleapis.com");

    if (!channelId || !apiKey) {
        return Response.json({ error: "Missing environment variables" }, { status: 500 });
    }

    apiUrl.searchParams.append("part", "statistics");
    apiUrl.searchParams.append("id", channelId);
    apiUrl.searchParams.append("key", apiKey);

    const completeApiUrl = apiUrl.toString();

    const resp = await fetch(completeApiUrl, {
        headers: {
            Accept: "application/json",
        },
        cache: 'no-store'
    });
    const data = await resp.json() as YoutubeApiResponse;
    const subscriberCount = get(data, "items[0].statistics.subscriberCount", "0");

    return Response.json({ number: subscriberCount });
}