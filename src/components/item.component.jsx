import React from "react";
import {Card} from 'flowbite-react';
import EditItem from "./editmodal.component";


function Item({item, id, setItems}){
    return (
        <div className="h-65 w-56 m-1 p-1">
            <Card imgSrc={item.logo}>
                    <div className="flex flex-row justify-between mx-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                    </h5>
                     <div className="flex flex-row justify-between items-center">
                        <EditItem item={item} id={id} setItems={setItems} />
                     </div>
                    </div>

                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item.address}
                    </p>

                </Card>

        </div>
              
    )
}
export default Item;