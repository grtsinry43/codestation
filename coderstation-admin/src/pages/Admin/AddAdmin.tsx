import React from 'react';

const AdminAdd: React.FC = () => {
  return <div>
    <h1>Add Admin</h1>
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Add Admin</button>
    </form>
  </div>;
};

export default AdminAdd;
