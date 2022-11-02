import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import {collection, addDoc, Timestamp, serverTimestamp} from 'firebase/firestore';
import { db, storage } from '../firebase/db';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CategoryModal from './category.compoonent';
import { v4 } from 'uuid';
import { TbFileUpload } from 'react-icons/tb';
import { BsCardImage } from 'react-icons/bs';


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

const AddNewContent = () => {
    const [open, setOpen] = React.useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState('');
  const [imgURL, setimgURL] = useState('');
  const [imgUploaded, setImgUploaded] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgSelected, setImgSelected] = useState(false);
  const [imgUploadErr, setimgUploadErr] = useState(false);
  const [imgChange, setImgChange] = useState(1);

  const [itemDetails, setItemDetails] = useState({
    title: '',
    address: '',
    email: '',
    date: '',
    app: '',
    logo: '',
    twitter: '',
    website: '',
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
   let arr = SearchTerms(itemDetails.title, itemDetails.description);
    setItemDetails({...itemDetails, search: arr, timestamp: serverTimestamp()});
    try {
        await addDoc(collection(db, 'Company'), {...itemDetails, search: arr, timestamp: serverTimestamp()}).then((data)=> {
            setLoading(false);
            setItemDetails({
              title: '',
              address: '',
              logo: '',
              email: '',
              date: '',
              app: '',
              description: '',
              founder: '',
              instagram: '',
              twitter: '',
              website: '',
              facebook: '',
              linkedin: '',
              privacy: 'false',
              status: '',
              category: [],
            })
        })
      } catch (err) {
        setLoading(false);
        alert(err);
      }
 }

 function handleChange(e){
    let name = e.target.name;
    let value = e.target.value;
   setItemDetails({...itemDetails, [name]: value});
 }
 function handleImgChange(e){
   setImgName(v4());
    setImg(e.target.files[0]);
 }
 const handleImgUpload = () => {
    if(img == null){
      return;
    }
    setImgUploading(true);
    const imageRef = ref(storage, `logos/${imgName}`);
    uploadBytes(imageRef, img).then((response)=> {

      setImgUploading(false);
      setImgUploaded(true);
      setImgChange(prev=> prev + 1);
    }).catch(err=> {
      alert(err);
      setImgUploading(false);
      setImgUploaded(false);
    })

 }
  useEffect(() => {
    const getImageURL = async () => {
      const ImageURL = await getDownloadURL(ref(storage, `logos/${imgName}`));
      setimgURL(ImageURL)
      setItemDetails({...itemDetails, logo: ImageURL});
    }
    if(img !== null){
      getImageURL();
    }

    
 }, [imgChange])
  return (
    <div className='bg-gray-50 w-[87%] '>
          <div className='heading-container flex flex-row justify-between p-4 ml-3'>
          <p className='font-extrabold text-2xl text-blue-700 text-left mt'>Add Item</p>
         </div>
         <div className='mt-3 ml-3'>
         <Divider light />
         </div>
         <div className='userinfo-container flex flex-row flex-wrap w-[50rem] ml-3'>
            <div className='field-con flex flex-col m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Title</label>
                <input type="text" className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name="title" value={itemDetails.title} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Email</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name="email" value={itemDetails.email} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Address</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name="address" value={itemDetails.address} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1 relative'>
                <label htmlFor="" className='font-semibold text-left'>Logo</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1 placeholder:p-1' placeholder='Paste Link or Pick Image' name="logo" value={itemDetails.logo} onChange={handleChange} />
                <div>
                   <label htmlFor="img" className='cursor-pointer absolute top-9 right-2 bg-gray-100 rounded-md h-7 w-7 flex flex-row justify-center items-center'><BsCardImage size="1.2em" className='z-10 bg-white' /></label>
                   <input type="file" id='img' hidden name="img"  onChange={handleImgChange} />   
                </div>
                <TbFileUpload onClick={handleImgUpload} size="1.7em" className='absolute top-9 -right-8 cursor-pointer' />
                <div className='absolute top-9 -right-[4.6rem]'>
                  {imgUploading?  <svg aria-hidden="true" class="mr-2 w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>: '' }

                </div>
            </div>

            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>App Link</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='app' value={itemDetails.app} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Item Founder</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='founder' value={itemDetails.founder} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Description</label>
                <textarea  className='w-[49rem] outline-none  h-20 rounded-md  border-[1px] p-1' name='description' value={itemDetails.description} onChange={handleChange} />
            </div>

            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Item Instagram</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name="instagram" value={itemDetails.instagram} onChange={handleChange}/>
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Item Twitter</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name="twitter" value={itemDetails.twitter} onChange={handleChange}/>
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Website Link</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='website' value={itemDetails.website} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Item FaceBook</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='facebook' value={itemDetails.facebook} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Item LinkedIn</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='linkedin' value={itemDetails.linkedin} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Status</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='status' value={itemDetails.status} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Date</label>
                <input type="text"  className='w-96 h-10 rounded-md border-[1px] outline-none p-1' name='date' value={itemDetails.date} onChange={handleChange} />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="" className='font-semibold text-left'>Category</label>
                <CategoryModal itemDetails={itemDetails} setItemDetails={setItemDetails} />
            </div>




            


         </div>
         <div className='w-[50rem] ml-3'>

            <div className='actions-container  m-1 p-1 flex flex-row'>
                <label htmlFor="" className='m-1'>Privacy</label>
                <div className='m-1 p-1'>
                   <AntSwitch checked={privacy} inputProps={{ 'aria-label': 'ant design' }} name="verifiedSwitch" onChange={()=> {
                    setItemDetails({...itemDetails, privacy: String(!privacy)});
                    setPrivacy(prev => (!prev));
                   }} />
                </div>
              
            </div>
            <div className='flex flex-row justify-end w-full mb-8'>
                <Button onClick={submitChanges} variant="contained" className="">
                 {loading? <Spinner />: null } 
                  <span className="pl-1">
                    {loading? 'Saving...': 'Save'}
                  </span>
                </Button>
                </div>
         </div>

    </div>
  )
}

export default AddNewContent