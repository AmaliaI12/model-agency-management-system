import React, { useState } from "react";
import '../styles/Login.css';
import Validation from './SignupValidation';

interface SignupValues {
  name: string;
  email: string;
  password: string;
}

interface SignupErrors {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true); // Show errors only on submit

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    const formValid = !validationErrors.name && !validationErrors.email && !validationErrors.password;

    if (formValid) {
      setIsSubmitting(true);

      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message); // e.g., "User created successfully"
          // Reset form
          setValues({ name: "", email: "", password: "" });
          setShowErrors(false);
          setErrors({ name: "", email: "", password: "" });
        } else {
          alert(data.error || "Failed to create account");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
      }

      setIsSubmitting(false);
    }
  };


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
            />
            {showErrors && errors.name && <p className="error" style={{ color: 'red' }}>{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {showErrors && errors.email && <p className="error" style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {showErrors && errors.password && <p className="error" style={{ color: 'red' }}>{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? "Submitting..." : "Sign up"}
          </button>

          <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
            Already have an account? Log in!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
