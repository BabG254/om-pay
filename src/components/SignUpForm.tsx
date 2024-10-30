import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Button } from '../components/Button'; // Assuming Button component is located in the same directory as the SignUpForm component
import { auth } from '../firebaseConfig';


interface SignUpFormProps {
  onSignUp: () => void;
}

export function SignUpForm({ onSignUp }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          nationalId,
        }),
      });
      onSignUp();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        placeholder="National ID"
        value={nationalId}
        onChange={(e) => setNationalId(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}