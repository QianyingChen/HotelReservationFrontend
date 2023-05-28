import { useEffect, useState } from 'react';
import { SignInFormData, User, useSignInUserMutation } from '../../api/userApi';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [signInUser] = useSignInUserMutation();


  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      setUser(JSON.parse(userJson)); 
    }
  }, []);


  const login = async (formData: SignInFormData) => {
    try {
      const user = await signInUser(formData).unwrap();
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };


  return { user, login, logout };
}

