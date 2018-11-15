import React from "react";
import PropTypes from "prop-types";
import "./ItemPage.css";
import Item from "./Item.js";



function ItemPage ({items,onAddToCart}){
  return(
    <div className="ItemPage-items">
      {items.map (item=>
        <div key={item.id} className="ItemPage-item">
          <Item item={item}>
            <button
              className="Item-addToCart"
              onClick={()=> onAddToCart(item)}>
                Add to Cart
            </button>
          </Item>
        </div>)}
    </div>
  )
}
ItemPage.propTypes ={
  items:PropTypes.array.isRequired,
  onAddToCart:PropTypes.func.isRequired
}

export default ItemPage;
