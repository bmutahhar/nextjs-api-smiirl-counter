import get from "lodash.get";

import {
  YoutubeApiSuccessResponse,
  YoutubeApiErrorResponse,
} from "@/types/YoutubeApiResponse";

export async function GET(request: Request) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const apiUrl = new URL("/youtube/v3/channels", "https://www.googleapis.com");

  if (!channelId || !apiKey) {
    return Response.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  apiUrl.searchParams.append("part", "statistics");
  apiUrl.searchParams.append("id", channelId);
  apiUrl.searchParams.append("key", apiKey);

  const completeApiUrl = apiUrl.toString();

  console.log(`Fetching subscriber count from ${completeApiUrl}`);

  const resp = await fetch(completeApiUrl, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (resp.ok) {
    const data = (await resp.json()) as YoutubeApiSuccessResponse;
    const subscriberCount = get(
      data,
      "items[0].statistics.subscriberCount",
      "0"
    );

    return Response.json({ number: subscriberCount });
  } else {
    const errorResponse = (await resp.json()) as YoutubeApiErrorResponse;
    return Response.json(
      {
        error:
          errorResponse?.error?.message ||
          "An error occurred while fetching the data",
      },
      { status: 500 }
    );
  }
}
