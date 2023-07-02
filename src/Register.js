import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register({name, setName, email, setEmail, password, setPassword, URL}) {
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${URL}/register`,{
        name:name,
        email: email,
        password: password
      });
      console.log(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
    }catch(error){
      console.log(error, "Register error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
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
      <h5>Already User? <button style={{border: 'none', background: 'none'}} onClick={()=> navigate('/')}>Login</button></h5>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;
