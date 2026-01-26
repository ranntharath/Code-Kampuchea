import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <div className="w-full max-w-md">
       

        {/* Login Form */}
        <LoginForm className="rounded-lg p-6 bg-white" />

        
      </div>
    </div>
  )
}
