
// Dependencies
import React from 'react';

const serializeFormData = function serializeFormData(form) {
  const formData = new FormData(form);
  const jsonData = {};

  for (const [key, value] of formData.entries) jsonData[key] = value;

  return jsonData;
};

export default function Login({
  handleUserNameChange,
  handleFormSubmit,
  userName,
  connectionError,
  connecting,
  connected,
}) {
  const loginForm = (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit(serializeFormData(event.target));
      }}
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userName}
        onChange={(event) => {
          handleUserNameChange(event.target.value);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );

  return (
    <div>
      {
        connecting ? 'Connecting...' : null
      }
      {
        connected ? loginForm : null
      }
      {
        connectionError !== null ? 'An error occurred connecting to the chat server, please try again in a few minutes.' : null
      }
    </div>
  );
}
