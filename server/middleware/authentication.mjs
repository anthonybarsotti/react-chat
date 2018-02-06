
// Dependencies
import jwt from '../utilities/jwt-promise.mjs';

exports.wsAuthMiddleware = async function wsAuthMiddleware(info, cb) {
  const { token } = info.req.headers;

  if (!token) {
    cb(false, 401, 'Unauthorized');
  } else {
    try {
      // Try to verify JWT and attach JWT payload to info object
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      info.req.user = decoded.user; // eslint-disable-line no-param-reassign
      cb(true);
    } catch (error) {
      cb(false, 401, 'Unauthorized');
    }
  }
};

export default async function authMiddleware(req, res, next) {
  const csrfTokenHeader = req.get('x-csrf-token');
  const csrfTokenCookie = req.signedCookies['csrf-token'];
  const authTokenCookie = req.signedCookies['auth-token'];

  // Compare cookie's CSRF token with the one passed in request headers
  if ((csrfTokenHeader !== csrfTokenCookie)) return res.status(401).end();

  try {
    // Try to verify JWT and attach JWT payload to req object
    const decoded = jwt.verify(authTokenCookie, process.env.JWT_SECRET);

    req.user = decoded.user;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
