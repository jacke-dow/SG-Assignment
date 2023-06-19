import React, { useState, useEffect } from "react";
import styles from "./UserEditForm.module.css";

const UserEditForm = ({ user, updateUser, cancelEdit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    let isValid = true;

    if (!email || !validateEmail(email)) {
      isValid = false;
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }

    if (!phone || !validatePhone(phone)) {
      isValid = false;
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }

    if (isValid) {
      const updatedUser = {
        ...user,
        name,
        email,
        phone,
      };

      updateUser(updatedUser);
    }
  };

  const handleCancel = () => {
    cancelEdit();
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Phone validation regex: 10 digits, cannot start with zero
    const phoneRegex = /^[1-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <span className={styles.error}>{emailError}</span>}
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {phoneError && <span className={styles.error}>{phoneError}</span>}
      <div className={styles.buttons}>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;
