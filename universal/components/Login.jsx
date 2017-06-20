
// Dependencies

import React from 'react';

export default function Login({
  handleUserNameChange,
  handleFormSubmit,
  userName,
}) {
  return (
    <form noValidate onSubmit={(event) => {
      event.preventDefault();
      handleFormSubmit(event.target);
    }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userName}
        onChange={(event) => { handleUserNameChange(event.target.value); }}
      />
      <button type="submit">Login</button>
    </form>
  );
};
