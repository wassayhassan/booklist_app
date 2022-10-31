import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import axios from 'axios';
import ItemList from './itemslist.component';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  overflowY: 'scroll',
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

export default function ItemEditModal({item, id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [privacy, setPrivacy] = useState(item.privacy === 'true'? true: false);
  const [itemDetails, setItemDetails] = useState({
    title: item.title,
    email: item.email,
    date: item.date,
    app: item.app,
    description: item.description,
    founder: item.founder,
    instagram: item.instagram,
    facebook: item.facebook,
    linkedin: item.linkedin,
    privacy: item.privacy,
    status: item.status,
    search: item.search,
    category: item.category,
    address: item.address
  })
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading,setDeleteLoading]= useState(false);

const submitChanges = async() => {
    setSaveLoading(true);
    
    const taskDocRef = doc(db, 'Company', id)
  try{
    await updateDoc(taskDocRef, itemDetails);
    setSaveLoading(false);
  } catch (err) {
    alert(err)
 }
}
const deleteItem = async() => {
    setDeleteLoading(true);
    const taskDocRef = doc(db, 'Company', id)
    try{
      await deleteDoc(taskDocRef).then(response=> {
        console.log(response);
      });
      setDeleteLoading(false);
    } catch (err) {
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
      <button onClick={handleOpen} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</button>
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
                <input type="text" className='w-56 h-10 rounded-md  border-[1px]' name="title" value={itemDetails.title} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col m-1 p-1'>
                <label htmlFor="">Address</label>
                <input type="text" className='w-56 h-10 rounded-md  border-[1px]' name="address" value={itemDetails.address} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Email</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name="email" value={itemDetails.email} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Date</label>
                <input type="text"  className='w-56 h-10 rounded-md border-[1px] ' name="date" value={itemDetails.date} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">App Link</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='app' value={itemDetails.app} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Description</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='description' value={itemDetails.description} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item Founder</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='founder' value={itemDetails.founder} onChange={handleChange} />
            </div>

            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item Instagram</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name="instagram" value={itemDetails.instagram} onChange={handleChange}/>
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item FaceBook</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='facebook' value={itemDetails.facebook} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Item LinkedIN</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='linkedin' value={itemDetails.linkedin} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Category</label>
                <CategoryModal itemDetails={itemDetails} setItemDetails={setItemDetails} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Search</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='description' value={itemDetails.search} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Status</label>
                <input type="text"  className='w-56 h-10 rounded-md  border-[1px]' name='status' value={itemDetails.status} onChange={handleChange} />
            </div>
            

            


         </div>
         <div>
            <div className='actions-container  m-1 p-1 flex flex-row'>
                <label htmlFor="" className='m-1'>Privacy</label>
                <div className='m-1 p-1'>
                   <AntSwitch checked={privacy} inputProps={{ 'aria-label': 'ant design' }} name="verifiedSwitch" onChange={()=> {
                    setPrivacy(prev => (!prev))
                   }} />
                </div>
              
            </div>
            <div className='flex flex-row justify-end'>
                <Button onClick={submitChanges} color="success" className='bg-blue-700 text-white p-1'>
                 {saveLoading? <Spinner aria-label="Spinner button example" />: '' } 
                  <span className="pl-3">
                    {saveLoading? 'Saving...': 'Save'}
                  </span>
                </Button>
                <Button onClick={deleteItem} color="failure" className='bg-red-700 text-white'>
                 {deleteLoading? <Spinner aria-label="Spinner button example" />: '' } 
                  <span className="pl-3">
                  {deleteLoading? 'Deleting...': 'Delete'}

                  </span>
                </Button>
                </div>
         </div>
        </Box>
      </Modal>
    </div>
  );
}