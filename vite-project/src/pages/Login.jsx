import React from 'react'
import { DarkGridAuth } from '../components/Signin'

const Login = () => {
  return (
    <div className="bg-wave-pattern h-screen bg-cover bg-center flex flex-col z-0 w-full relative">
      <div className="z-10 w-full">
        <DarkGridAuth />
      </div>
    </div>
  )
}

export default Login