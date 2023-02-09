import { AuthError } from "firebase/auth";

export const parseFirebaseError = (error: AuthError) => {
  const { message } = error;

  if (message.match(/weak-password/gi)) {
    return "Password should be at least 6 characters";
  }

  if (message.match(/wrong-password/gi)) {
    return "Wrong password";
  }

  if (message.match(/email-already-in-use/gi)) {
    return "Email already in use";
  }

  if (message.match(/invalid-email/gi)) {
    return "Invalid email";
  }

  if (message.match(/not-found/gi)) {
    return "User not found";
  }

  return "Invalid credentials";
};
