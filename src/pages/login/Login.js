import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// Styles
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <label>
        <span>Email :</span>
        <input
          required
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
      </label>
      <label>
        <span>Password :</span>
        <input 
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <div>
        <h4>For Password reset:</h4>
        <p>Send us an email at <b>passrest@brightcommunity.com</b> with your registered email id and we will send you a password reset link. </p>
        <br />
      </div>
      {!isPending && <button className="btn">Log in</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}