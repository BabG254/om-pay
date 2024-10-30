import axios from 'axios';
type AxiosError<T = any> = Error & {
  config: any;
  code?: string;
  request?: any;
  response?: {
    data: T;
    status: number;
    headers: any;
  };
  isAxiosError: boolean;
};

// Define interfaces for better type safety
interface AuthResponse {
  access_token: string;
  expires_in: string;
}

interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

interface StkPushRequest {
  BusinessShortCode: string;
  Password: string;
  Timestamp: Date;
  TransactionType: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

async function initiateStkPush(
  amount: number,
  phoneNumber: string
): Promise<StkPushResponse> {
  const apiKey = process.env.MPESA_API_KEY;
  const apiSecret = process.env.MPESA_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('API credentials are not configured');
  }

  const authUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  try {
    // Get auth token
    const authResponse = await axios.post<AuthResponse>(
      authUrl,
      null,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
        }
      }
    );

    const accessToken = authResponse.data.access_token;

    const stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    
    const businessShortCode = process.env.BUSINESS_SHORT_CODE;
    const password = process.env.PASSWORD;
    const partyB = process.env.PARTY_B;
    const domain = process.env.DOMAIN;

    if (!businessShortCode || !password || !partyB || !domain) {
      throw new Error('Required environment variables are not configured');
    }

    const stkRequest: StkPushRequest = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: new Date(),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount.toString(),
      PartyA: phoneNumber,
      PartyB: partyB,
      PhoneNumber: phoneNumber,
      CallBackURL: `${domain}/stk-push-callback`,
      AccountReference: phoneNumber,
      TransactionDesc: 'Payment',
    };

    // Make STK push request
    const stkResponse = await axios.post<StkPushResponse>(
      stkPushUrl,
      stkRequest,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return stkResponse.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Check if it's an Axios error
      const axiosError = error as AxiosError;
      if (axiosError.isAxiosError) {
        console.error('STK push error:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data
        });
      } else {
        console.error('Error initiating STK push:', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
}

export default initiateStkPush;