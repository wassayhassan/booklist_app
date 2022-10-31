import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {  HiTemplate} from "react-icons/hi"
import {IoIosLogOut} from 'react-icons/io';
import { logout } from "../slices/authSlice";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
function DashNav(){
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let activeClassName = "bg-blue-400 p-1 m-2 flex flex-row justify-center rounded-2xl";
    let normalStyle = " p-2  m-2 flex flex-row justify-center rounded-lg hover:bg-blue-300";
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
    <div className="navbar-container  h-screen m-2  sticky top-0 flex flex-col mt-14 "  >
       <div className="navLinks-container bg-blue-200 rounded-md w-16">
            <ul>
              
                    <NavLink to="/" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <HiTemplate size="2.5em" color={pathname === '/dashboard/list'? 'blue':'black'}/>
                    </NavLink>
                    <div className="flex flex-row justify-center items-center">
                    <IoIosLogOut className="cursor-pointer" size="1.6em" onClick={handleLogout} />

                    </div>
     
            </ul>
        
        </div> 
            

         
   </div>
)
}
export default  DashNav;