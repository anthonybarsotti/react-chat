
// Dependencies
import express from 'express';
import authMiddleware from '../middleware/authentication.mjs';

export default function api(db) {
  const router = new express.Router();

  // Authenticate all traffic to the API
  router.all('*', authMiddleware);

  return router;
}
