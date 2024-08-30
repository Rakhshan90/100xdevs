'use client'

import { singup } from '@/app/actions/user';
// import axios from 'axios';
import React, { useState } from 'react'

export const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <div className="flex justify-center">
        <div className="border shadow p-4">
          <div className='flex flex-col gap-4'>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className='p-4 rounded-xl' placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} type="text" className='p-4 rounded-xl' placeholder='password' />
            {/* <button onClick={()=> {axios.post('http://localhost:3000/api/user', {email, password})} } type='submit' className='py-3 px-6 bg-black text-white'>Sign Up</button> */}
            <button onClick={async () => {
              const res = await singup(email, password)
              console.log(res)
            }} type='submit' className='py-3 px-6 bg-black text-white'>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}
