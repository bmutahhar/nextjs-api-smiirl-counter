export interface YoutubeStatistics {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
}

export interface YoutubeChannel {
    kind: string;
    etag: string;
    id: string;
    statistics: YoutubeStatistics;
}


export interface YoutubeApiResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeChannel[];
}