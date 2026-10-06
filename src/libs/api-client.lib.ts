import 'server-only';

import { auth0 } from '@/libs/auth0.lib';

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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

  const text = await response.text();

  if (!text) {
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return undefined as T;
  }

  const body = JSON.parse(text);

  if (!response.ok) {
    throw new ApiError(response.status, body.message);
  }

  return body as T;
}
