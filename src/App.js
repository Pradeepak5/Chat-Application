import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Chat from './Chat';
const URL = 'http://localhost:5000';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} URL={URL} />}/>
        <Route path='/register' element={<Register name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} URL={URL}/>} />
        <Route path='/chat' element={<Chat name={name} email={email} URL={URL} /> }/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
