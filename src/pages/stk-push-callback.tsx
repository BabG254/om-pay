import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StkPushCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Process the callback data here
    // This is where you'd typically check the status of the transaction
    // and update the UI accordingly
    
    // Redirect to success page after processing
    navigate('/transaction-success');
  }, []);

  return null;
}

export default StkPushCallback