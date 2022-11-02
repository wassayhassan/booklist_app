import React, {useEffect} from 'react';
import DashNav from './dashbarnav.component';
import { useNavigate } from 'react-router-dom';
import AddNewContent from './AddNewContent';
import {useSelector} from 'react-redux'

const AddNew = () => {

    const navigate = useNavigate();
    const {user} = useSelector(state=> state.auth)
    useEffect(()=> {
      if(user === "undefined" || user === null ||user === undefined || user === "null"){
        navigate('/login');
      }
    }, [])


  return (
    <div className='dashboard-container w-screen flex flex-row'>
        <DashNav />
        <AddNewContent />
    
 </div>
  )
}

export default AddNew