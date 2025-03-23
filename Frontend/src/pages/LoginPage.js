import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    if (!username.trim() || !password.trim() ) {
      alert('Please fill all the required fields.');
      window.location.reload(); 
      return;
    }
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        alert('Login successfully done ! Now you can create your own post');
        setUserInfo(userInfo);
        setRedirect(true);
        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload(); 
      });
      setRedirect(true);
      return <Navigate to={'/'} />
    } else {
      alert('wrong credentials');
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
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
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
      <button  type="submit" >Login</button>
      <button type="button" className="backbutton" onClick={handleCancel}>Cancel</button>
      </div> 
    </form>
  );
}