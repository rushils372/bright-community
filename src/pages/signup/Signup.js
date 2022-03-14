import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// Styles
import './Signup.css'

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);
    
  }

  const handleFileChange = (e) =>{
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected);
    
    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('Thumbnail Updated');
    

  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div>
        <h3>Registration Process</h3>
        <br />
        <h4>For Students or Questions:</h4>
        <br />
        <p>If you are a student and registering for a question just add <b>"Student"</b> before the name.</p>
        <br />
        <h4>For Experts:</h4>
        <br />
        <p>If you are an expert or deep knowledge person of anything and want to help others with our <b>"learn in public initiative"</b>, during registration add expert before your name or domain which you have the expertise and send email to <b>"expreg@brightcommunity.com"</b> and we will approve after some clarifications.</p>  
        <br />
      </div>
      <h2>Sign Up</h2>
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
      <label>
        <span>Display Name :</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail :</span>
        <input
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      
      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}