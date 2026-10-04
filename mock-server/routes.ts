import { Application } from 'express';

const mockRoutes = (server: Application, db: any) => {
  // ─────────────────────────────────────────────────────────────
  server.get('/users/me', (_req, res) => {
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(409).send({ message: 'An account with this email already exists. Account linking is required.' });
    // return res.status(410).send({ message: 'This Account has been deleted.' });
    // return res.status(503).send({ message: 'Technical error.' });

    res.status(200).json(db.get('user-current').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.delete('/users/me', (_req, res) => {
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

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
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

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
    // return res.status(404).send({ message: 'User not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

    res.status(200).json(db.get('user-profile').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.patch('/users/profile', (req, res) => {
    // return res.status(404).send({ message: 'User profile not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

    const profile = db.get('user-profile').value();

    db.set('user-profile', {
      ...profile,
      ...req.body,
    }).value();

    return res.status(200).send(); // updated successfully
  });

  // ─────────────────────────────────────────────────────────────
  server.get('/users/preferences', (req, res) => {
    // return res.status(404).send({ message: 'User Preferences not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

    res.status(200).json(db.get('user-preferences').value());
  });

  // ─────────────────────────────────────────────────────────────
  server.patch('/users/preferences', (req, res) => {
    // return res.status(400).send({ message: 'At least one field must be provided.' });
    // return res.status(404).send({ message: 'User Preferences not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

    const preferences = db.get('user-preferences').value();

    db.set('user-preferences', {
      ...preferences,
      ...req.body,
    }).value();

    return res.status(200).send(); // updated successfully
  });

  // ─────────────────────────────────────────────────────────────
  server.get('/users/identities', (_req, res) => {
    // return res.status(404).send({ message: 'User identities not found.' });
    // return res.status(503).send({ message: 'Technical error.' });

    res.status(200).json(db.get('user-identities').value());
  });
};

export default mockRoutes;
