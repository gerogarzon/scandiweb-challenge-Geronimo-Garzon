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
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeBackgorundColor = this.changeBackgorundColor.bind(this);
  }
  // this.state.productsInCart.filter(e=>{return e.name !== name || []})
  async addToCart({product, attributes}) {
    const { name, brand, prices, gallery } = product;
    let data = { name, brand, prices, gallery, attributes };
    let alreadyInCart = this.state.productsInCart.map((e) =>{ 
      return e === name 
    })
    console.log(alreadyInCart);
    if (alreadyInCart.length === 0){
      await this.setState({ productsInCart: [...this.state.productsInCart, data] });
      console.log("yes")
    } else {
      console.log("oh")
      // await this.setState({ productsInCart: [...this.state.productsInCart] });
    }
  }

  
  removeFromCart(e) {
    const name = e.target.dataset.id;
    let deletedProduct = this.state.productsInCart.filter((e)=> { return e.name !== name });
    this.setState({ productsInCart: deletedProduct });
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
    let removeFromCart = this.removeFromCart;
    let changeBackgorundColor = this.changeBackgorundColor;

    return (
      <CartContext.Provider
        value={{
          productsInCart,
          backgroundColor,
          addToCart,
          removeFromCart,
          changeBackgorundColor,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
