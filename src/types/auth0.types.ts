import {
  GetAccessTokenOptions,
  SessionData,
  StartInteractiveLoginOptions,
} from '@auth0/nextjs-auth0/types';
import { NextRequest, NextResponse } from 'next/server';

export type MockAuth0ClientType = {
  middleware(req: Request | NextRequest): Promise<NextResponse>;
  getSession(): Promise<SessionData | null>;
  getAccessToken: (options?: GetAccessTokenOptions) => Promise<{ token: string }>;
  startInteractiveLogin: (options?: StartInteractiveLoginOptions) => Promise<NextResponse>;
};
