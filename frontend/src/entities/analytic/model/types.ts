export interface AnalyticsQueryDto {
  dateFrom: string;
  dateTo: string;
}

export interface AnalyticsGroup {
  article: {
    id: number;
    title: string;
    createdAt: string;
  };
  comments: Array<{
    id: number;
    message: string;
    createdAt: string;
  }>;
}

export interface AnalyticsResponse {
  period: {
    dateFrom: string;
    dateTo: string;
  };
  groups: AnalyticsGroup[];
}

export interface AnalyticsState {
  data: AnalyticsResponse | null;
  loading: boolean;
  error: string | null;
}