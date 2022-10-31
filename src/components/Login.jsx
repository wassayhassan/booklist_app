import React, {useEffect, useState} from 'react'
import {TextInput, Label} from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { rlogin } from '../slices/authSlice';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=> state.auth);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    useEffect(()=> {
      if(user !== "undefined" && user !== null && user !== undefined && user !== "null"){
        navigate('/');
      }
    }, [user])

    function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        console.log(e.target.name);
        console.log(e.target.value)
    

        setCredentials({...credentials, [name]: value});

    }
    const handleLogin = async(e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            
            console.log(userCredential.user);
            const user = userCredential.user;
            
            dispatch(rlogin(userCredential.user.email))

             
        }).catch((err)=> {
          alert(err);
        })

       
    }



  return (
    <div className='min-w-screen h-screen'>
        <div className='flex flex-row justify-center items-center'>
        <form className="flex flex-col gap-4 border-[1px] p-2 rounded-lg w-64 h-64 mt-20" onSubmit={handleLogin}>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Email"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      name="email"
      placeholder="example@gmail.com"
      required={true}
      onChange={handleChange}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Password"
      />
    </div>
    <TextInput
      id="password1"
      type="password"
      name="password"
      required={true}
      onChange={handleChange}
    />
  </div>

  <Button type="submit" onClick={handleLogin}>
    Login
  </Button>
</form>

        </div>
      
    </div>
  )
}

export default Login