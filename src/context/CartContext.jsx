import React, { Component } from "react";

const CartContext = React.createContext();

export default CartContext;

export class CartProvider extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      productsInCart: [],
      backgroundColor: 1,
    };
    this.addToCart = this.addToCart.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeBackgorundColor = this.changeBackgorundColor.bind(this);
  }
  
  async addToCart({product, attributes, quantity}) {
    const { name, brand, prices, gallery } = product;
   
    let data = { name, brand, prices, gallery, attributes, quantity };
    let currentProduct = this.state.productsInCart.find((e)=> { return e.name === name });

    console.log("cart",this.state.productsInCart)

    
    // let currentAttributeValue = attributes[attributes.length-1].value;
    // console.log("current",currentAttributeValue)
  
    // let previusAttributeValue = this.state.productsInCart.map(item=> {return item.attributes})
    // console.log("previus", previusAttributeValue)
    // let value = previusAttributeValue[Array.length - 1];
    // console.log("value", value)
    
    
   

    if( currentProduct === undefined){
      await this.setState({ productsInCart: [...this.state.productsInCart, data] }); 
    } else {
      console.log("already in cart")
    }
  }

  async addQuantity (e){
    const name = e.target.dataset.id;
    let currentProduct = this.state.productsInCart.find((e)=> { return e.name === name });
    let currentQuantity = currentProduct.quantity;
    currentProduct.quantity = currentQuantity + 1;
    
    let previusProducts = this.state.productsInCart.filter((e)=>{return e.name !== name});
    
    await this.setState({productsInCart: [ currentProduct, ...previusProducts]})
     console.log(this.state.productsInCart)
  }

 
  
 async removeFromCart(e) { 
    const name = e.target.dataset.id;
    let currentProduct = this.state.productsInCart.find((e)=> { return e.name === name });
    let currentQuantity = currentProduct.quantity;
    currentProduct.quantity = currentQuantity + 1;
    let previusProducts = this.state.productsInCart.filter((e)=>{return e.name !== name});

    if(currentQuantity > 1){
      currentProduct.quantity = currentQuantity - 1;
      await this.setState({productsInCart: [currentProduct, ...previusProducts]})
       
    } else {
      let deletedProduct = this.state.productsInCart.filter((e)=> { return e.name !== name });
      
     await this.setState({ productsInCart: deletedProduct });
     
    }
  }
  

  changeBackgorundColor() {
    let currentColor = this.state.backgroundColor;
    if (currentColor === 0.2) {
      this.setState({ backgroundColor: 1 });
    }
    if (currentColor === 1) {
      this.setState({ backgroundColor: 0.2 });
    }
  }

  render() {

    let productsInCart = this.state.productsInCart;
    let backgroundColor = this.state.backgroundColor;
    let addToCart = this.addToCart;
    let addQuantity = this.addQuantity;
    let removeFromCart = this.removeFromCart;
    let changeBackgorundColor = this.changeBackgorundColor;

    return (
      <CartContext.Provider
        value={{
          productsInCart,
          backgroundColor,
          addToCart,
          addQuantity,
          removeFromCart,
          changeBackgorundColor,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
