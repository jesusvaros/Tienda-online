import React from "react";

const Nav =({ activeTab , onTabChange , cart, price})=>(
  <nav className="App-nav">
    <div className="row">
      <div className={`App-nav-item ${activeTab=== 0 && "selected"}`}>
        <a onClick ={()=>onTabChange(0)}> Items </a>
      </div>
      <div className={`App-nav-item ${activeTab === 1 && 'selected'}`}>
        <a  onClick={()=>onTabChange(1)}> Cart </a>
      </div>
      <div className="CartPreView">
        <CartPreView cart={cart} price={price}/>
      </div>
    </div>
  </nav>
);
function CartPreView({cart, price}){
  let cartlenght =cart.length;
  switch (cartlenght) {
    case 0:return<div>
                    Empty Cart
                  </div>
                  break;
    default:return<div>
              {cart.length} items<span className="whitespace"/>({price}$)
            </div>
            break;
  }
}
export default Nav;
