import React from 'react';
import Nav from "./Nav.js";
import './index.css';
import "./app.css";
import ItemPage from "./ItemPage.js";

import CartPage from "./CartPage";

class App extends React.Component{

  state={
    activeTab:0,
    cart:[],
    total:0,
    items:[]
  };

  async componentDidMount(){
    try {
      const res = await fetch("http://127.0.0.1:8000/api/")
      const todos = await res.json();
      this.setState({
        items : todos
      });
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  handleTabChange =(index)=>{
    this.setState({
      activeTab:index,
    });
  }

  handleAddToCart =(item)=>{
    this.setState({
      cart:[...this.state.cart,item.id]
    });
  }

  handleRemoveOne =(item)=>{
    let index=this.state.cart.indexOf(item.id);
    this.setState({
      cart:[
        ...this.state.cart.slice(0,index),
        ...this.state.cart.slice(index+1)
      ]
    });
  }

  renderContent (){
    switch(this.state.activeTab){
      default:
      case 0: return<div>
                      <ItemPage
                        items ={this.state.items}
                        onAddToCart={this.handleAddToCart}
                      />
                    </div>

      case 1:return <div>
                        {this.EmptyCart()}
                    </div>;
    }
  }
  EmptyCart(){
    let cartlenght=this.state.cart.length;
    switch (cartlenght) {
      case 0:return<div className="emptycart">
                      The Cart is Empty
                    </div>

        default:return<div>
                        {this.renderCart()}
                        <div className="totalprice">
                        total:<span className="whitespace"/>{this.renderTotal()}$
                        </div>
                      </div>
    }
  }
  renderTotal(){
    let total=0;
    this.state.cart.forEach(item=>{
      total += this.state.items[item-1].price
      })
    total=total.toFixed(2)

    return(
      <span >
      {total}

      </span>
    )
  }
  renderCart (){
    let itemCounts = this.state.cart.reduce ((itemCounts,itemId)=>{
      itemCounts[itemId] = itemCounts[itemId]||0;
      itemCounts[itemId]++;
      return itemCounts ;
    },{});

    let cartItems = Object.keys(itemCounts).map(itemId=>{
      var item= this.state.items.find(item=>
        item.id=== parseInt(itemId,10)
      );
    return{
        ...item,
        count:itemCounts[itemId]
      }
    });

    return(
      <div>
        <CartPage
          items={cartItems}
          onAddOne={this.handleAddToCart}
          onRemoveOne={this.handleRemoveOne}
        />

      </div>
    );
  }

  render(){
    let {activeTab}=this.state;
    let {cart}=this.state;
    let price=this.renderTotal();
    return(
      <div className="App">

        <Nav
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          cart={cart}
          price={price}/>
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}
export default App;
