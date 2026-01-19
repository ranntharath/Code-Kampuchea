export interface CreatePaymentResponse {
  qr_string: string;
  merchant_name: string;
  md5: string;
  amount: string;
  order_id: number;
}

