import React, {useEffect, useState} from 'react';
import DashNav from './dashbarnav.component';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../firebase/db';
import ItemEditContent from './ItemEditContent';
import {useSelector} from 'react-redux';

const ItemEdit = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null)
    const navigate = useNavigate();
    const {user} = useSelector(state=> state.auth)
    useEffect(()=> {
      if(user === "undefined" || user === null ||user === undefined || user === "null"){
        navigate('/login');
      }
    }, [])
    useEffect(()=> {
        async function getData(){
            const docRef = doc(db, "Company", id);
            try {
                const docSnap = await getDoc(docRef);
                setItem(docSnap.data());
            } catch(error) {
                alert(error);
            }

        }

        getData();
    }, [id])


  return (
    <div className='dashboard-container w-screen flex flex-row'>
        <DashNav />
       {id && item &&  <ItemEditContent item={item} id={id} />}
    
 </div>
  )
}

export default ItemEdit