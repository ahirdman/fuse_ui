import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'

export function useUserData() {
  const [user, loading, error] = useAuthState(auth);

  const login = () => {
    signInWithEmailAndPassword(auth, 'test@fuse.com', 'password');
  };
  const logout = () => {
    signOut(auth);
  };
  
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error</p>
  }

  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
}