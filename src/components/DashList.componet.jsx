import React, {useEffect} from 'react';
import DashNav from './dashbarnav.component';
import DashListContent from './dashlistcontent.component';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function DashList(){
    const navigate = useNavigate();
    const {user} = useSelector(state=> state.auth)
    useEffect(()=> {
      if(user === "undefined" || user === null ||user === undefined || user === "null"){
        navigate('/login');
      }
    }, [])
    return (
        <div className='dashboard-container  flex flex-row overflow-x-hidden'>
           <DashNav />
           <DashListContent />
           
        </div>
    )
}
export default DashList;