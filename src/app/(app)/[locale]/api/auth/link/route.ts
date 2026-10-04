import { auth0 } from '@/libs/auth0.lib';

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return await auth0.startInteractiveLogin({
    authorizationParameters: {
      connection: 'google-oauth2',
      prompt: 'login',
    },
    returnTo: `/${locale}/profile`,
  });
}
