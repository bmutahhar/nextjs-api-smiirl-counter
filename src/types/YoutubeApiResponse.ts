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


export interface YoutubeApiSuccessResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeChannel[];
}

export interface YoutubeApiErrorResponse {
    error: {
        code: number;
        message: string;
        errors: {
            domain: string;
            reason: string;
            message: string;
        }[];
    };
}