import { auth0 } from '@/libs/auth0.lib';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export async function apiClient<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
  const { token } = await auth0.getAccessToken();

  const url = `${process.env.NEXT_API_GATEWAY_URL}/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const body = await response.text();

    console.error('API ERROR:', {
      url,
      status: response.status,
      body,
    });

    throw new ApiError(
      body || `API request failed with status ${response.status}`,
      response.status
    );
  }

  const body = await response.text();

  if (!body) {
    return undefined as T;
  }

  return JSON.parse(body) as T;
}
