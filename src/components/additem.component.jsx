import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import axios from 'axios';
import ItemList from './itemslist.component';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { db } from '../firebase/db';
import CategoryModal from './category.compoonent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: '1.2em',
  border: '1px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

export default function ItemAddModal({setItems, items}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [approved, setApproved] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    title: '',
    address: '',
    email: '',
    date: '',
    app: '',
    logo: '',
    description: '',
    founder: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    privacy: 'false',
    status: '',
    category: [],
  })
  const [loading, setLoading] = useState(false);
  
  const SearchTerms = (term1,term2) => {
    const finalterm =  term1 + ' ' + term2;
    const lower = finalterm.toLowerCase();
    const length = finalterm.length;
    let arr = [];
    for(let i = 1; i <= length; i++){
       arr.push(lower.slice(0,i));
    }
    return arr;
  }

const submitChanges = async() => {
  setLoading(true);
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
   let arr = SearchTerms(itemDetails.title, itemDetails.description);
    setItemDetails({...itemDetails, search: arr, date: dateTime});
    try {
        await addDoc(collection(db, 'Company'), {...itemDetails, search: arr, date: dateTime}).then((data)=> {
            setLoading(false);
            setItems([...items,{data: {...itemDetails, search: arr, date: dateTime}, id: data.id}]);
            setItemDetails({
              title: '',
              address: '',
              email: '',
              date: '',
              app: '',
              logo: '',
              description: '',
              founder: '',
              instagram: '',
              facebook: '',
              linkedin: '',
              privacy: 'false',
              status: '',
              category: [],
            })
        })
      } catch (err) {
        setLoading(true);
        alert(err);
      }
 }

 function handleChange(e){
    let name = e.target.name;
    let value = e.target.value;
   setItemDetails({...itemDetails, [name]: value});
 }

  return (
    <div>
      <button onClick={handleOpen} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Add Item</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className='heading-container'>
            <p className='font-bold text-2xl'>Item Details</p>
         </div>
         <div className='userinfo-container flex flex-row flex-wrap'>
            <div className='field-con flex flex-col m-1 p-1'>
                <label htmlFor="">Title</label>
                <input type="text" className='w-56 h-10 rounded-md border-[1px]' name="title" value={itemDetails.title} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Email</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name="email" value={itemDetails.email} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Address</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name="address" value={itemDetails.address} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Logo</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name="logo" value={itemDetails.logo} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">App Link</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='app' value={itemDetails.app} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Description</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='description' value={itemDetails.description} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item Founder</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='founder' value={itemDetails.founder} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item Instagram</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name="instagram" value={itemDetails.instagram} onChange={handleChange}/>
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item FaceBook</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='facebook' value={itemDetails.facebook} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item LinkedIn</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='linkedin' value={itemDetails.linkedin} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Status</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px]' name='status' value={itemDetails.status} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Category</label>
                <CategoryModal itemDetails={itemDetails} setItemDetails={setItemDetails} />
            </div>



            


         </div>
         <div>

            <div className='actions-container  m-1 p-1 flex flex-row'>
                <label htmlFor="" className='m-1'>Privacy</label>
                <div className='m-1 p-1'>
                   <AntSwitch checked={privacy} inputProps={{ 'aria-label': 'ant design' }} name="verifiedSwitch" onChange={()=> {
                    setPrivacy(prev => (!prev));
                    setItemDetails({...itemDetails, 'privacy': String(privacy)});
                    
                   }} />
                </div>
              
            </div>
            <div className='flex flex-row flex-end w-full'>
                <Button onClick={submitChanges} className="p-2">
                 {loading? <Spinner aria-label="Spinner button example" />: '' } 
                  <span className="pl-3">
                    {loading? 'Saving...': 'Save'}
                  </span>
                </Button>
                <Button onClick={handleClose} className="bg-red-700 text-white p-2">
                    Close
                </Button>
                </div>
         </div>
        </Box>
      </Modal>
    </div>
  );
}