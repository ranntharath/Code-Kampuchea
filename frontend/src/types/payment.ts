export interface CreatePaymentResponse {
  qr_string: string;
  merchant_name: string;
  md5: string;
  amount: string;
  course_id: number;
}

export interface PaymentConfirmationResponse {
  success: boolean;
  paid: boolean;
  message: string;
  amount?: string;
  currency?: string;
}