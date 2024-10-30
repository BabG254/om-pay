declare module './pages/SignIn' {
  interface SignInProps {
    onSignIn: () => Promise<void>;
  }
  const SignIn: React.FC<SignInProps>;
  export default SignIn;
}

declare module './pages/Home' {
  const Home: React.FC;
  export default Home;
}

declare module './components/Analysis' {
  const Analysis: React.FC;
  export default Analysis;
}

declare module './components/Footer' {
  const Footer: React.FC;
  export default Footer;
}

declare module './components/TransactionForm' {
  interface TransactionFormProps {
    transactionType: string;
    onTransaction: (amount: number, phoneNumber: string) => Promise<void>;
  }
  export const TransactionForm: React.FC<TransactionFormProps>;
}