
// Dependencies
import jwt from 'jsonwebtoken';

export default class JWT {
  static sign(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1m',
      }, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded);
      });
    });
  }
}
