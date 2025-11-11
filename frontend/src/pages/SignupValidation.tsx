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

export default function Validation(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {
    name: "",
    email: "",
    password: "",
  };

  // Name validation
  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Email validation
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Invalid email format.";
  }

  // Password validation
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password must contain at least 1 uppercase, 1 lowercase letter, and 1 number.";
  }

  return errors;
}
