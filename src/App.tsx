/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
// import SignIn from './pages/SignIn';
// import Home from './pages/Home';
import { TransactionForm } from './components/TransactionForm';
import Analysis from './components/Analysis';
import Footer from './components/Footer';

// Firebase configuration - replace with your config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      setError(error as Error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const handleTransaction = async (amount: number, phoneNumber: string) => {
    // Implement your transaction logic here
    console.log('Transaction:', { amount, phoneNumber });
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          // element={user ? <Home /> : <Navigate to="/signin" />}
        />
        <Route 
          // path="/signin" 
          // element={user ? <Navigate to="/home" /> : <SignIn onSignIn={handleSignIn} />}
        />
        <Route 
          path="/home" 
          // element={user ? <Home /> : <Navigate to="/signin" />}
        />
        <Route 
          path="/transaction" 
          element={
            user ? 
            <TransactionForm 
              transactionType="payment"
              onTransaction={handleTransaction}
            /> : 
            <Navigate to="/signin" />
          } 
        />
        <Route 
          path="/analysis" 
          element={user ? <Analysis /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/footer" 
          element={<Footer />} 
        />
      </Routes>
    </Router>
  );
}

export default App;