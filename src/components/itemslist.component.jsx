import React from "react";
import Item from "./item.component";

const ItemList = ({list, setItems}) => {
    return (
        
            <div className="flex flex-row flex-wrap">
              {list && list.map((item, idx)=> {
                return <Item item={item.data} id={item.id} key={idx} setItems={setItems}/>
              })}
            </div>
        
    )
}
export default ItemList;