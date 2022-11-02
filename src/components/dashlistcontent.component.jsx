import React from "react";
import {useState, useEffect, useRef} from 'react'
import {collection, query, onSnapshot, getCountFromServer, startAfter, limit, orderBy, endBefore} from "firebase/firestore"
import { db } from "../firebase/db";
import ItemList from "./itemslist.component";
import { Button } from "antd";
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';



const DashListContent = () => {
    const [items, setItems] = useState([]);
    // const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastvisible, setLastvisible] = useState({});
    const [firstVisible, setFirstVisible] = useState({});
    const [dataLoading, setDataLoading] = useState(false);
    // const [start, setStart] = useState(1);
    const onetime = useRef(10);
    
    useEffect(()=> {
      setDataLoading(true);
      async function getRecords(){
        const coll = collection(db, "Company");
        const snapshot = await getCountFromServer(coll);
        if(snapshot){
            // setTotalRecords(snapshot.data().count.current);
            setTotalPages(Math.ceil(snapshot.data().count/onetime.current));
            const q = query(collection(db, 'Company'), orderBy('title'), limit(10))
            onSnapshot(q, (querySnapshot) => {
              setItems(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
              setLastvisible(querySnapshot.docs[querySnapshot.docs.length-1])
              
            })
          
            // setStart(5);
      }     
   }
   
   getRecords().then(()=> {
    setDataLoading(false);
   }).catch((err)=> {
    setDataLoading(false);
    alert(err);
   });

   

    }, [])


    const handlePageChange = async() => {
      setDataLoading(true);
        const q = query(collection(db, 'Company'),orderBy('title'),startAfter(lastvisible),limit(10))
        onSnapshot(q, (querySnapshot) => {
          setItems(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
          setLastvisible(querySnapshot.docs[querySnapshot.docs.length-1]);
          setFirstVisible(querySnapshot.docs[0]);
          setCurrentPage(prev=> prev + 1);
        })
        setDataLoading(false);
    }
    const goBackHandle = async()=> {
      setDataLoading(true);
      const q = query(collection(db, 'Company'),orderBy('title'),endBefore(firstVisible),limit(10))
      onSnapshot(q, (querySnapshot) => {
        setItems(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
        setLastvisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        setFirstVisible(querySnapshot.docs[0]);
        setCurrentPage(prev=> prev - 1);
      })
      setDataLoading(false);
    }
    
    

    return (
        <div className="bg-gray-50 w-[87%] p-1">
        <div className='heading-container flex flex-row w-full m-2 p-2 '>
          <p className='font-extrabold text-2xl text-blue-700 text-left'>Manage Companies</p>
        </div>
        <Divider light />
        <div>

        </div>
        
        <div className="m-1">
        {dataLoading? <CircularProgress size="3em" className="mt-10" />:  <ItemList list={items} setItems={setItems} />}
       
        </div>
           <div className="flex flex-row justify-start w-screen mr-36 ml-1">
            {totalPages > 1 && currentPage !== 1 && <Button onClick={goBackHandle} className="bg-blue-600 rounded-md p-2 text-white m-2" >Show Prev</Button>}
              {totalPages > 1 && totalPages !== currentPage && 
             <Button onClick={handlePageChange} className="bg-blue-600 rounded-md p-2 text-white m-2" >Show Next</Button>

  }
</div>


            
        </div>

    )

}
export default DashListContent;