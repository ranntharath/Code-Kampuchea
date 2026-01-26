import { SignupForm } from "@/components/signup-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <SignupForm className="shadow-xl border rounded-lg p-6 bg-white" />
      </div>
    </div>
  )
}
