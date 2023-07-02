import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({email, setEmail, password, setPassword, URL}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register')
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${URL}/login`,{
        email: email,
        password: password
      });
      if(response.data.message === 'Login success'){
        const access_token = response.data.access_token
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('userId', response.data.Data._id);
        console.log(response.data.message);
        navigate('/chat')
      }else{
        console.log(response.data.message);
      }
    }catch(error){
      console.log(error, "Login error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <h5>New User? <button style={{border: 'none', background: 'none'}} onClick={handleNavigate}>Create Account</button></h5>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
