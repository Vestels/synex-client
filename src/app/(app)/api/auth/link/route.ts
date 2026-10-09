import { API_ROUTES } from '@/constants/constants';
import { apiClient } from '@/libs/api-client.lib';
import { auth0 } from '@/libs/auth0.lib';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth0.getSession(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { secondaryIdToken, provider } = await request.json();

    if (!secondaryIdToken) {
      return NextResponse.json({ error: 'Secondary ID token required' }, { status: 400 });
    }

    await apiClient<void>(
      `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.IDENTITIES}/${API_ROUTES.USERS.LINK_IDENTTIY}`,
      {
        method: 'POST',
        body: { provider: provider, idToken: secondaryIdToken },
      }
    );

    revalidateTag('user-identities', 'max');

    return NextResponse.json({ message: 'Linking successful', status: 200 });
  } catch (error) {
    console.error('Link initiate error:', error);
    return NextResponse.json({ error: 'Internal server error', status: 500 });
  }
}
