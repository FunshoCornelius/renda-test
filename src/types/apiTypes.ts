export interface ApiError {
  data: {
    message: string;
  };
  status: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
