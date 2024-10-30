import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button'; // Assuming Button component is located in the same directory as the current file

interface TransactionFormProps {
  transactionType: string;
  onTransaction: (amount: number, phoneNumber: string) => Promise<void>;
}

export function TransactionForm({ transactionType, onTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onTransaction(amount, phoneNumber);
      navigate('/transaction-success');
    } catch (error) {
      console.error('Error processing transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={transactionType}
        onChange={(e) => {}}
        className="border border-gray-300 p-2 rounded"
      >
        <option value="">Select Transaction Type</option>
        <option value="SEND MONEY">Send Money</option>
        <option value="PAYBILL">Pay Bill</option>
        <option value="BUY GOODS">Buy Goods</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <Button type="submit" variant="primary">Process Transaction</Button>
    </form>
  );
}