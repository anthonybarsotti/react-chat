
// Dependencies
import express from 'express';
import CSRF from 'csrf';
import jwt from '../utilities/jwt-promise.mjs';

// Generate a CSRF token to be stored in the browser
const generateCSRF = function generateCSRF() {
  return new Promise((resolve, reject) => {
    const csrf = new CSRF();

    csrf.secret((error, secret) => {
      if (error) reject(error);
      resolve(csrf.create(secret));
    });
  });
};

export default function authentication(db) {
  const router = new express.Router();

  router.post('/', async (req, res) => {
    try {
      // Query for user based on provided creds
      const query = 'SELECT id FROM user WHERE username = $1 AND password = crypt($2, password);';
      const result = await db.one(query, [
        req.body.username,
        req.body.password,
      ]);

      try {
        // Generate JWT with found user ID
        const token = await jwt.sign({
          user: result.id,
        });
        const csrf = await generateCSRF();

        // Set headers to be used to auth future requests in double submit mechanism
        res.cookie('auth-token', token, { signed: true });
        res.cookie('csrf-token', csrf, { signed: true });

        // Send CSRF upon successful generation
        res.send({
          csrf,
        });
      } catch (error) {
        // Throw 500 if CSRF or JWT couldn't be generated
        res.status(500).end();
      }
    } catch (error) {
      // If creds passed were incorrect, send back a 422
      res.status(422).end();
    }
  });

  return router;
}
