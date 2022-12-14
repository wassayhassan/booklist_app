import React from "react";
import { Link } from "react-router-dom";


function Item({item, id, setItems}){
    return (
        <div className="h-64 w-64 m-1 p-2 flex flex-col border-gray-100 border-[1px] rounded-md shadow-md">
            
                <div className="h-2/3 rounded-full flex flex-row justify-center items-center">
                    <img src={item.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} alt="img" className="h-full" />
                </div>
                    <div className="flex flex-col justify-between mx-2 items-center">
                    <h5 className="text-2xl font-bold tracking-tight text-black">
                    {item.title}
                    </h5>
                     <div className="flex flex-row justify-between items-center">
                        <Link to={`/company/${id}`}  item={item} id={id} >
                          <button className="font-medium text-green-600 hover:underline dark:text-blue-500">Edit Info</button>
                        </Link>
                     </div>
                    </div>

                

        </div>
              
    )
}
export default Item;