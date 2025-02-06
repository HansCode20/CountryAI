import React from 'react'
import '../style/MainBackground.css'

const HandleLogin = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/auth/github";
  }

  return (
    <div className='main-bg flex justify-center items-center min-h-screen'>
      <button onClick={handleLogin} className="p-3 bg-gray-800 text-white rounded">
        Login with GitHub
      </button>
    </div>
  )
}

export default HandleLogin;