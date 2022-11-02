import Box from '@mui/material/Box';
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function CategoryModal({itemDetails, setItemDetails}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChange(e){
    let name = e.target.name;  
      if(e.target.checked){
         let newCateg = [...itemDetails.category, name]
         setItemDetails({...itemDetails, category: newCateg});
      }else{
         let newCateg = itemDetails.category;
           newCateg = newCateg.filter(ite=> ite !== name);
         setItemDetails({...itemDetails, category: newCateg});
      }
   }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Select Category
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        
        <div className='p-1 m-1'>
           <div className='m-1'>
             <input type="checkbox" name="company1" id='company1' checked={itemDetails.category.includes("company1")? true: false} value="company1" className='p-1' onChange={handleChange} />
                <label className='font-medium m-1 cursor-pointer' htmlFor='company1' >Company 1</label>
            </div>
            <Divider light />
            <div className='m-1'>
             <input type="checkbox" name="company2" id='company2' value="company2" onChange={handleChange} checked={itemDetails.category.includes("company2")? true: false} />
                <label className='font-medium m-1 cursor-pointer' htmlFor='company2'>Company 2</label>
            </div>
            <Divider light />
            <div className='m-1'>
             <input type="checkbox" name="company3" id='company3'  value="company3" onChange={handleChange} checked={itemDetails.category.includes("company3")? true: false} />
                <label className='font-medium m-1 cursor-pointer' htmlFor='company3'>Company 3</label>
            </div>
               
              </div>
        
      </Popover>
    </div>
  );
}