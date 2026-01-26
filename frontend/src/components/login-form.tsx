import { cn } from "@/lib/utils";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authHook";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { useState } from "react";
import type { Login } from "@/types/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { handleSetToken } = useAuth();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(formData).unwrap();

      if (response) {
        handleSetToken(response.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-color text-2xl">ចូលគណនី</CardTitle>
          <CardDescription>
            បំពេញអ៊ីមែលរបស់អ្នកខាងក្រោមដើម្បីចូលគណនី
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">ពាក្យសម្ងាត់</FieldLabel>
                  <NavLink
                    to={""}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    តើភ្លេចពាក្យសម្ងាត់?
                  </NavLink>
                </div>
                <Input
                  onChange={handleInputChange}
                  name="password"
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full bg-primary-color hover:bg-primary-color/90 active:scale-95"
                >
                  ចូល
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  ចូលជាមួយ Google
                </Button>
                <FieldDescription className="text-center">
                  មិនមានគណនីទេ?{" "}
                  <NavLink to={"/register"}>បង្កើតគណនីថ្មី</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
