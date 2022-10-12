import React, { Component } from "react";
import CartContext from "../context/CartContext";
import CurrencyContext from "../context/CurrencyContext";
import next from "../resources/carousel-add.png";
import prev from "../resources/carousel-remove.png";
import "../css/cartdetail.css";

export default class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.0,
      carousel: "",
      count:1,
    };
    this.changeImage_next = this.changeImage_next.bind(this);
    this.changeImage_prev = this.changeImage_prev.bind(this);
  }

   changeImage_next = async(id)=>{
    // read the product id
    let productId= id; 
    // find that product
    let context = this.context.productsInCart.find((e)=> e.id === productId)
    // give me its gallery
    let gallery = context.gallery;
    // initilities the counter
    let i = this.state.count;
    // read the gallery in counter position
    let currentImage = gallery[i]
    // save that image in carousel state, that state is being read in img source
    await this.setState({carousel: currentImage})
    // update counter
      if(i < gallery.length-1){
      await this.setState({count: i + 1})
      } else {
      await this.setState({count: 0})
      }   
  }

  changeImage_prev = async(id)=>{ 
     // read the product id
    let productId= id; 
    // find that product 
    let context = this.context.productsInCart.find((e)=> e.id === productId)
    // give me his gallery
    let gallery = context.gallery;
      // initilities the counter
    let i = this.state.count ;
    // read the gallery in counter position
    let currentImage = gallery[i]
    // save that image in carousel state, that state is being read in img source
    await this.setState({carousel: currentImage})
     // update counter    
    if(i > 0){
      await this.setState({count: i - 1})
      } else {
      await this.setState({count: 4})
      } 
  }

  render() {
    return (
      <>
        <CartContext.Consumer>
          {({ productsInCart, addQuantity, removeFromCart, backgroundColor }) => (
            <>
              <CurrencyContext.Consumer>
                {(context) => (
                  <>
                    <div style={{opacity:backgroundColor}} className="cartdetail_container">
                      <div className="title">CART</div>
                      {productsInCart.length === 0 && (
                        <em className="empty_cart">No products added</em>
                      )}
                      {productsInCart.map((item, index) => {
                        return (
                          <div key={index} className="products_container">
                            <div className="products_items">
                              <div className="products_items_col colone">
                                <b className="product_brand">{item.brand}</b>
                                <div className="product_name">{item.name}</div>
                                <div>
                                  {item.prices.map((e, index) => {
                                    return (
                                      <div key={index}>
                                        {e.currency.label ===
                                          context.currency && (
                                          <p key="index" className="item_price">
                                            {e.currency.label}{" "}
                                            {Number(
                                              item.quantity * e.amount
                                            ).toFixed(2)}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  {item.attributes.map((attribute, index) => {
                                    return (
                                      <div key={index}>
                                        <div className="attribute_id">
                                          {attribute.id}:
                                        </div>
                                        {attribute.id === "Color" ? (
                                          <div
                                            style={{
                                              backgroundColor: attribute.value,
                                            }}
                                            className="attribute_typecolor"
                                          ></div>
                                        ) : (
                                          <div className="attribute_typeValue">
                                            {attribute.value}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="products_items_col coltwo">
                                <button
                                  className="add_button"
                                  onClick={() => addQuantity(item.id)}
                                >
                                  +
                                </button>
                                <div key={index} className="quantity">
                                  {item.quantity}
                                </div>
                                <button
                                  className="subtract_button"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  -
                                </button>
                              </div>
                              <div className="products_items_col colthird">
                                <img
                                  className="img"
                                  src={item.gallery[this.state.count] || item.gallery[0]}
                                  alt="product"
                                />
                                <div className="arrow_btn_container">
                                  <button className="arrow_btn" onClick={()=>this.changeImage_next(item.id)}><img className="arrow" src={next} alt="arrow"/></button>                               
                                  <button className="arrow_btn" onClick={()=>this.changeImage_prev(item.id)}><img className="arrow" src={prev} alt="arrow"/></button>                              
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="total_container">
                        <div className="total_items">
                          <p>Tax 21%:</p>
                          <b className="amount_total">
                            {context.currency}{" "}
                            {Number(Number(
                              productsInCart.reduce((acc, product) => {
                                if (
                                  product.prices.map((e) => {
                                    return (
                                      e.currency.label === context.currency
                                    );
                                  })
                                ) {
                                  let price = product.prices.find((evt) => {
                                    return (
                                      evt.currency.label === context.currency
                                    );
                                  });
                                  return acc + price.amount * product.quantity;
                                }
                              }, 0)
                            ).toFixed(2) * 0.21).toFixed(2)}{" "}
                          </b>
                        </div>
                        <div className="total_items">
                          <p>Quantity:</p>
                          <b className="amount_total">{productsInCart.reduce((acc, product)=>{ return acc + product.quantity}, 0)}</b>
                        </div>
                        <div className="total_items">
                          <p>Total:</p>
                          <b className="amount_total">
                            {context.currency}{" "}
                            {Number(
                              productsInCart.reduce((acc, product) => {
                                if (
                                  product.prices.map((e) => {
                                    return (
                                      e.currency.label === context.currency
                                    );
                                  })
                                ) {
                                  let price = product.prices.find((evt) => {
                                    return (
                                      evt.currency.label === context.currency
                                    );
                                  });
                                  return acc + price.amount * product.quantity;
                                }
                              }, 0)
                            ).toFixed(2)}
                          </b>
                        </div>
                        <button className="btn_order">ORDER</button>
                      </div>
                    </div>
                  </>
                )}
              </CurrencyContext.Consumer>
            </>
          )}
        </CartContext.Consumer>
      </>
    );
  }
}
CartDetail.contextType = CartContext;