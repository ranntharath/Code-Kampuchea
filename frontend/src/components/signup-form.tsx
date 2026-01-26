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
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/features/auth/api/authApi";
import { useAuth } from "@/hooks/authHook";
import type { Register } from "@/types/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Spinner } from "./ui/spinner";
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { handleSetToken } = useAuth();
  const navigate = useNavigate();
  const [register,{isLoading:isRegistering}] = useRegisterMutation();
  const [formData, setFormData] = useState<Register>({
    name: "",
    email: "",
    passsword: "",
    password_confirmation: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      navigate("/verify-otp", {
        state: { email: formData.email },
      });
      handleSetToken(response.token);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-primary-color text-2xl">
          បង្កើតគណនីថ្មី
        </CardTitle>
        <CardDescription>
          បំពេញព័ត៌មានរបស់អ្នកខាងក្រោមដើម្បីបង្កើតគណនី
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">ឈ្មោះពេញ</FieldLabel>
              <Input
                onChange={handleInputChange}
                name="name"
                id="name"
                type="text"
                placeholder="ឈ្មោះរបស់អ្នក"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">អ៊ីមែល</FieldLabel>
              <Input
                onChange={handleInputChange}
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                អ៊ីមែលនេះនឹងត្រូវប្រើសម្រាប់ទំនាក់ទំនង។
                យើងមិនចែករំលែកអ៊ីមែលរបស់អ្នកជាមួយអ្នកផ្សេងទេ។
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">ពាក្យសម្ងាត់</FieldLabel>
              <Input
                onChange={handleInputChange}
                name="password"
                id="password"
                type="password"
                required
              />
              <FieldDescription>
                ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ។
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password_confirmation">
                បញ្ជាក់ពាក្យសម្ងាត់
              </FieldLabel>
              <Input
                onChange={handleInputChange}
                name="password_confirmation"
                id="password_confirmation"
                type="password"
                required
              />
              <FieldDescription>
                សូមបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក។
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field className="space-y-3">
                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full bg-primary-color hover:bg-primary-color/90 cursor-pointer active:scale-95"
                >
                  {isRegistering? <Spinner/> : "បង្កើតគណនី"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  ចុះឈ្មោះជាមួយ Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  មានគណនីរួចហើយ? <NavLink to={"/login"}>ចូល</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
