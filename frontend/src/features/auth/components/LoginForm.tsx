import { Input } from '@/components/ui/input'
import type { Login } from '@/types/auth';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApi';
import { useAuth } from '@/hooks/authHook';

function LoginForm() {
    const {handleSetToken} = useAuth()
    const navigate = useNavigate()
    const [login] = useLoginMutation();
    const [formData,setFormData] = useState<Login>({
        email: "",
        password:  ""
    });
    const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
            setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try{
            const response = await login(formData).unwrap()

            if(response){
                handleSetToken(response.token);
                navigate('/')
            }
        }catch(err){
            console.log(err)
        }

    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
            onChange={handleInputChange}
              name="email"
              placeholder="email"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
            onChange={handleInputChange}
              name="password"
              placeholder="password"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Button */}
          <button 
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account yet?{" "}
          <NavLink to={'/register'}>
            <span className="cursor-pointer font-medium text-blue-600 hover:underline">
            Register
          </span>
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default LoginForm