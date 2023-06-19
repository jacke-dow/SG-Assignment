import React, { useState } from "react";
import styles from "./UserForm.module.css";

const UserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    let isValid = true;

    if (!name) {
      isValid = false;
      alert("Please enter a name");
      return;
    }

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
      const newUser = {
        name,
        email,
        phone,
      };

      addUser(newUser);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
    }
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
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
