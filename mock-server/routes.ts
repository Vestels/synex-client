import { Application } from 'express';

interface MockDb {
  get(key: string): {
    value(): unknown;
  };
}

const mockRoutes = (server: Application, db: MockDb) => {
  // User
  server.get('/users/preferences/app', (_req, res) => {
    res.json(db.get('app-preferences').value());
  });

  server.get('/users/me', (_req, res) => {
    res.json(db.get('user-current').value());
  });

  server.get('/users/profile', (_req, res) => {
    res.json(db.get('user-profile').value());
  });

  server.get('/users/preferences', (_req, res) => {
    res.json(db.get('user-preferences').value());
  });

  server.get('/users/identities', (_req, res) => {
    res.json(db.get('user-identities').value());
  });
};

export default mockRoutes;
