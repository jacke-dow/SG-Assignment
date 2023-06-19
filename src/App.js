import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserEditForm from "./components/UserEditForm";
import styles from "./App.module.css";

const App = () => {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "9876543210",
    },
  ]);
  const [editUser, setEditUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex(
      (user) => user.name === updatedUser.name
    );
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

  const cancelEdit = () => {
    setEditUser(null);
  };

  return (
    <div className={styles.container}>
      <h1 style={{textAlign: "center"}}>User Management Web App   </h1>
      <UserForm addUser={addUser} />
      <div className={styles.userList}>
        {users.map((user, index) => (
          <div key={index} className={styles.userCard}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button
              className={styles.editButton}
              onClick={() => handleEditUser(user)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => deleteUser(index)}
            >
              Delete
            </button>
            {editUser && editUser.name === user.name && (
              <UserEditForm
                user={editUser}
                updateUser={updateUser}
                cancelEdit={cancelEdit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
