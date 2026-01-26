import { OTPForm } from "@/components/otp-form"

function OtpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
          <div className="w-full max-w-md">
           
    
            {/* Login Form */}
            <OTPForm className="rounded-lg p-6 bg-white" />
    
            
          </div>
        </div>
  )
}

export default OtpPage