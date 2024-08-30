'use client'

import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'

const Appbar = () => {
  const session = useSession();
  return (
    <div className='p-4 flex gap-8'>
        <button onClick={()=>signIn()}>Sign In</button>
        <button onClick={()=> signOut()}>Logout</button>
        {JSON.stringify(session)}
    </div>
  )
}

export default Appbar