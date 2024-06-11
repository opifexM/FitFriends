import React from 'react';
import ReactDOM from 'react-dom/client';
import { User } from 'shared/type/user.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const user: User = {
  age: 0,
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com'
};

console.log(user);

root.render(
  <React.StrictMode>
    <h1>Hello, World!</h1>
  </React.StrictMode>
);
