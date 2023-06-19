import React, { useState } from 'react';
import UserForm from './UserForm';
import UserEditForm from './UserEditForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex((user) => user.name === updatedUser.name);
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
    setEditUser(null);
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  return (
    <div>
      <UserForm addUser={addUser} />
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => deleteUser(index)}>Delete</button>
          </div>
        ))}
      </div>
      {editUser && <UserEditForm user={editUser} updateUser={updateUser} />}
    </div>
  );
};

export default App;
