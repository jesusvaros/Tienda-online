import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import "./CartPage.css";

function CartPage ({items,onAddOne,onRemoveOne}){
  return(
    <div className="CartPage-items">
      {items.map (item=>
        <div key={item.id} className="CartPage-item">
          <Item item={item}>
            <div className="CarItem-controls">
              <button
                className="CartItem-removeOne"
                onClick={()=>onRemoveOne(item)}
              >
                &ndash;
              </button>
              <div className="CartItem-count">{item.count}</div>
              <button
                className="CartItem-addOne"
                onClick ={()=> onAddOne (item)}
              > + </button>
            </div>
          </Item>
      </div>
      )}
    </div>
  );
}
CartPage.propTypes ={
  items:PropTypes.array.isRequired,
  onAddOne:PropTypes.func.isRequired,
  onRemoveOne:PropTypes.func.isRequired
};

export default CartPage;
