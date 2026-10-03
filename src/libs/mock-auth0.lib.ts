export const mockSession = {
  user: {
    nickname: "testuser",
    name: "mock@auth.com",
    picture: "/assets/images/test/test-pfp.jpg",
    email: "mock@auth.com",
    email_verified: true,
    sub: "auth|mock-user",
  },

  tokenSet: {
    accessToken: "mock-access-token",
    idToken: "mock-id-token",
    scope: "",
    requestedScope: "",
    audience: "",
    expiresAt: Math.floor(Date.now() / 1000) + 86400,
  },

  internal: {
    sid: "mock-session-id",
    createdAt: Math.floor(Date.now() / 1000),
  },

  exp: Math.floor(Date.now() / 1000) + 86400,
};
