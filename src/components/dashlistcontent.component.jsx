import React from "react";
import {useState, useEffect, useRef} from 'react'
import {collection, query, onSnapshot, getCountFromServer, startAfter, limit, getDocs, orderBy} from "firebase/firestore"
import { db } from "../firebase/db";
import ItemList from "./itemslist.component";
import Pagination from '@mui/material/Pagination';
import ItemAddModal from "./additem.component";
import { getListItemAvatarUtilityClass } from "@mui/material";
import { Button } from "antd";




const DashListContent = () => {
    const [items, setItems] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastvisible, setLastvisible] = useState({});
    const [start, setStart] = useState(1);
    const onetime = useRef(10);
    
    useEffect(()=> {

      async function getRecords(){
        const coll = collection(db, "Company");
        const snapshot = await getCountFromServer(coll);
        if(snapshot){
            setTotalRecords(snapshot.data().count.current);
            console.log(snapshot.data().count/onetime.current)
            setTotalPages(snapshot.data().count/onetime.current);
            const q = query(collection(db, 'Company'), orderBy('title'), limit(10))
            onSnapshot(q, (querySnapshot) => {
              setItems(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
              setLastvisible(querySnapshot.docs[querySnapshot.docs.length-1])
            })
          
            setStart(5);
      }     
   }
   getRecords().then().catch((err)=> {
    console.log(err);
   });



    }, [])


    const handlePageChange = async() => {
      
        const q = query(collection(db, 'Company'),orderBy('title'),startAfter(lastvisible),limit(10))
        onSnapshot(q, (querySnapshot) => {
          setItems(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
          setLastvisible(querySnapshot.docs[querySnapshot.docs.length-1])
        })

    }
    
    

    return (
        <div>
        <div className='heading-container flex flex-row w-full'>
          <p className='font-extrabold text-2xl text-blue-700 text-left'>Items</p>
          <div className="ml-5 flex flex-row justify-center items-center">
          <ItemAddModal setItems={setItems} items={items} />
          </div>
        </div>
        <div>

        </div>
        {console.log(items)}
        <div>
        <ItemList list={items} setItems={setItems} />
        </div>
           <div className="flex flex-row justify-center w-screen">
              {totalPages> 1 ? 
             <Button onClick={handlePageChange} >Show Next</Button>: null

  }
</div>


            
        </div>

    )

}
export default DashListContent;