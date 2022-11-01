import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../slices/authSlice";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
function DashNav(){
    
    const {user} = useSelector(state=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }
    useEffect(() => {
        if(user === "undefined" || user === null ||user === undefined || user === "null"){
            navigate('/login');
          }
    }, [user])
    
    return (
    <div className="navbar-container  h-screen m-2  sticky top-0 flex flex-col mt-14 "  >
       <div className="navLinks-container w-32">
            <ul>
              
                    <NavLink to="/">
                        <div className="bg-blue-800 m-1 p-1  rounded-md flex flex-row justify-center">
                        <button className="bg-blue-800 border-none text-white">Company</button>
                        </div>  
                    </NavLink >
                    <div className="m-1 p-1 flex flex-row justify-center">
                    <button className=" text-black cursor-pointer border-[1px] border-black rounded-md w-28 hover:bg-black hover:text-white "  onClick={handleLogout} >Logout</button>

                    </div>
     
            </ul>
        
        </div> 
            

         
   </div>
)
}
export default  DashNav;