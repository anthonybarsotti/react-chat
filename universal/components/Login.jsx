
// Dependencies

import React from 'react';

export default function Login() {
  return (
    <form noValidate>
      <input
        type="text"
        name="username"
        placeholder="Username"
      />
      <button type="submit">Login</button>
    </form>
  );
};
