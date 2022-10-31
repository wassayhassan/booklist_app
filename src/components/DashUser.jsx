import React, {useEffect} from 'react';
import DashNav from './dashbarnav.component';
import DashUsersContent from './DashUsercontent.component';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function DashList(){
    // const navigate = useNavigate();
    // const {userData} = useSelector(state=> state.auth)
    // useEffect(()=> {
    //   if(!userData){
    //     navigate('/auth/user/login');
    //   }else if(userData.adminStatus !== 'true' ){
    //     navigate('/auth/user/login'); 
    //   }
    // }, [])
    return (
        <div className='dashboard-container  flex flex-row'>
           <DashNav />
           <DashUsersContent />
           
        </div>
    )
}
export default DashList;