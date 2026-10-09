import { AUTH } from '@/constants/constants';
import { Auth0Client } from '@auth0/auth0-spa-js';

let Auth0ClientSpa: Auth0Client | null = null;

export async function getAuth0ClientSpa() {
  if (Auth0ClientSpa) return Auth0ClientSpa;

  Auth0ClientSpa = new Auth0Client({
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,

    authorizationParams: {
      redirect_uri: `${window.location.origin}/api/${AUTH.BASE}/${AUTH.LINKING}/${AUTH.CALLBACK}`,
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!,
      scope: 'openid profile email',
    },
  });

  return Auth0ClientSpa;
}

export async function authenticateAuth0ClientSpa(connection: string) {
  const client = await getAuth0ClientSpa();

  await client.loginWithPopup({
    authorizationParams: {
      connection,
      prompt: 'login',
    },
  });

  const claims = await client.getIdTokenClaims();

  if (!claims) {
    throw new Error('Secondary authentication failed');
  }

  return {
    idToken: claims.__raw,
  };
}
