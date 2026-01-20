export interface Order {
  id: number;
  user_id: number;
  course_id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface OrdersResponse {
    message: string;
    order: Order
} 
