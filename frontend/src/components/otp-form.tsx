import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useVeritfyOtpMutation } from "@/features/auth/api/authApi";
import { Spinner } from "./ui/spinner";

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [verifyOtp, { isLoading: isVerifying }] = useVeritfyOtpMutation();
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email?: string })?.email;

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await verifyOtp({ email: email!, otp }).unwrap();
      if(response){
        navigate('/')
      }
    } catch (error) {}
    console.log("OTP value:", otp); 
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-primary-color text-2xl">
          បញ្ចូលកូដផ្ទៀងផ្ទាត់
        </CardTitle>
        <CardDescription>
          យើងបានផ្ញើកូដ 6 ខ្ទង់ទៅអ៊ីមែលរបស់អ្នក។
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">កូដផ្ទៀងផ្ទាត់</FieldLabel>

              <div className="flex justify-center items-center gap-2">
                <Input
                  type="text"
                  placeholder="កូដ OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border w-full rounded-sm px-3 py-1  text-start focus:outline-none focus:ring-1 focus:ring-primary-color"
                />
                
              </div>
              <FieldDescription>
                សូមបញ្ចូលកូដ 6 ខ្ទង់ដែលបានផ្ញើទៅអ៊ីមែលរបស់អ្នក។
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Button
                type="submit"
                className="w-full bg-primary-color hover:bg-primary-color/90 active:scale-95"
              >
                {isVerifying? <Spinner/> : "ផ្ទៀងផ្ទាត់"}
              </Button>
              <FieldDescription className="text-center">
                មិនទទួលបានកូដ? <Button>ផ្ញើម្តងទៀត</Button>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
