import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  async function register(ev) {
    ev.preventDefault();

    if (!username.trim() || !password.trim() ) {
      alert('Please fill all the required fields.');
      window.location.reload(); 
      return;
    }
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('Registration successfully done! You can now log in with your username and password.');
      setRedirect(true);
      return <Navigate to={'/'} /> 
    } else {
      alert('registration failed');
      window.location.reload(); 
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }


  const handleCancel = () => {
    setRedirect(true);
    return <Navigate to={'/'} />
  };

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <label>Username</label>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <label>Password</label>            
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <div className="button-row">          
      <button>Register</button>
      <button type="button" className="backbutton" onClick={handleCancel}>Cancel</button>

      </div> 
    </form>
  );
}




