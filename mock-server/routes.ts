import { Application } from 'express';

const mockRoutes = (server: Application, db: any) => {
  // ─────────────────────────────────────────────────────────────
  server.get('/users/me', (_req, res) => {
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(409).send({ message: 'An account with this email already exists. Account linking is required.' });
    // return res.status(410).send({ message: 'This Account has been deleted.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    return res.status(200).json(db.get('user-current').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.delete('/users/me', (_req, res) => {
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    const currentUser = db.get('user-current').value();

    const deletionRequestAt = new Date();
    const scheduledDeletionAt = new Date(deletionRequestAt);

    scheduledDeletionAt.setMonth(deletionRequestAt.getMonth() + 1);

    db.set('user-current', {
      ...currentUser,
      userStatus: 'PENDING_DELETION',
      deletionRequestAt: deletionRequestAt,
      scheduledDeletionAt: scheduledDeletionAt,
    }).value();

    return res.status(200).send(); // successful deletion request
  });

  // ─────────────────────────────────────────────────────────────
  server.post('/users/me/deletion/cancel', (_req, res) => {
    // return res.status(400).send({ message: 'Invalid request.' });
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    const currentUser = db.get('user-current').value();

    db.set('user-current', {
      ...currentUser,
      userStatus: 'ACTIVE',
      deletionRequestAt: '',
      scheduledDeletionAt: '',
    }).value();

    return res.status(200).send(); // successful deletion cancel request
  });

  // ─────────────────────────────────────────────────────────────
  server.get('/users/profile', (_req, res) => {
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    return res.status(200).json(db.get('user-profile').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.patch('/users/profile', (req, res) => {
    // return res.status(400).send({ message: 'Invalid request.' });
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User profile not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    const profile = db.get('user-profile').value();

    db.set('user-profile', {
      ...profile,
      ...req.body,
    }).value();

    return res.status(200).send(); // updated successfully
  });

  // ─────────────────────────────────────────────────────────────
  server.get('/users/preferences', (req, res) => {
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User Preferences not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    return res.status(200).json(db.get('user-preferences').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.patch('/users/preferences', (req, res) => {
    // return res.status(400).send({ message: 'Invalid request.' });
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(400).send({ message: 'At least one field must be provided.' });
    // return res.status(404).send({ message: 'User Preferences not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    const preferences = db.get('user-preferences').value();

    db.set('user-preferences', {
      ...preferences,
      ...req.body,
    }).value();

    return res.status(200).send(); // updated successfully
  });

  // ─────────────────────────────────────────────────────────────
  server.get('/users/identities', (_req, res) => {
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(404).send({ message: 'User identities not found.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    return res.status(200).json(db.get('user-identities').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.post('/users/identities/link', (_req, res) => {
    // return res.status(400).send({ message: 'Invalid request.' });
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(409).send({ message: 'Conflict on request.' });
    // return res.status(410).send({ message: 'Auth0 user not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    const identities = db.get('user-identities').value();

    const now = new Date().toISOString();

    const linkedIdentity = {
      provider: 'GOOGLE',
      createdAt: now,
      lastUsedAt: now,
      isPrimary: false,
    };

    db.set('user-identities', [...identities, linkedIdentity]).value();

    return res.status(200).send(); // linked successfully
  });

  // ─────────────────────────────────────────────────────────────
  server.delete('/users/identities/link', (req, res) => {
    // return res.status(400).send({ message: 'Invalid provider.' });
    // return res.status(401).send({ message: 'Unauthorized.' });
    // return res.status(409).send({ message: 'Conflict on request.' });
    // return res.status(410).send({ message: 'Auth0 user not found.' });
    // return res.status(500).send({ message: 'Internal server error.' });
    // return res.status(503).send({ message: 'Service temporarily unavailable.' });

    db.get('user-identities').remove({ provider: req.body.provider }).value();

    return res.status(200).send(); // deleted successfully
  });
};

export default mockRoutes;
