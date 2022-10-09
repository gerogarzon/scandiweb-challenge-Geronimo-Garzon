import React, { Component } from "react";
import CurrencyContext from "../context/CurrencyContext";
import CartContext from "../context/CartContext";

import "../css/productdetail.css";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      mainImage: "",
      productInCart: [],
      attributes: [],
    };
    this.handleClick = (e) => {
      let data = e.currentTarget.getAttribute("src");
      this.setState({ mainImage: data });
    };
    this.attributes = async (e)=>{ 
      let data = e;       
      await this.setState({ attributes: [...this.state.attributes, data] });     
    }   
  }

  async componentDidMount() {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("productID");

   await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
                product(id:"${id}"){
                        brand
                        name
                        inStock
                        description
                        gallery
                        prices{
                          currency{
                            label
                            symbol
                          }
                          amount
                        } 
                        attributes{
                            id
                            name
                            type
                            items{
                                displayValue
                                value
                                id
                            }
                          }          
                }
              }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          product: [res.data.product],
        });
      });
  }

  render() {
    return (
      <CartContext.Consumer>
        {({ addToCart, backgroundColor }) => (
          <>
          <CurrencyContext.Consumer>
            {(context) => (
              <>
                {this.state.product.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ opacity: backgroundColor }}
                      className="container"
                    >
                      <div className="sideGallery">
                        {item.gallery.map((item, index) => {
                          return (
                            <img
                              key={index}
                              src={item}
                              alt="gallery"
                              className="sideGallery_items"
                              onClick={this.handleClick}
                            />
                          );
                        })}
                      </div>
                      <div className="mainContent">
                        <img
                          src={this.state.mainImage || item.gallery[0]}
                          alt="gallery"
                          className="mainImage"
                        />
                        <div className="productCharacteristics">
                          <h1 className="productBrand"> {item.brand} </h1>
                          <h2 className="productName">{item.name}</h2>
                          {item.attributes.map((itm, index) => {
                            return (
                              <div key={index}>
                                <div className="attributes">                                 
                                  <h5 className="attributes_title">
                                    {itm.name}:
                                  </h5>
                                  {itm.type === "swatch" ? (
                                    <>
                                      {itm.items.map((item) => {
                                        return (                                         
                                          <button
                                                                                     
                                            key={item.id}
                                            onClick={()=>this.attributes({id: itm.id, value:item.value}) }  
                                            className="attributes_buttons typeColor"
                                            style={{
                                              backgroundColor: item.value,
                                            }}
                                          ></button>                                         
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <>
                                      {itm.items.map((item) => {
                                        return (                                         
                                          <button
                                          type="radio"
                                          id="focus"    
                                            key={item.id}                                   
                                            onClick={()=>this.attributes({id: itm.id, value:item.value}) }                                          
                                            placeholder={item.value}
                                            className="attributes_buttons"
                                            style={{
                                              backgroundColor: item.value,
                                            }}
                                          >
                                            {item.value}
                                          </button>                                        
                                        );
                                      })}
                                    </>
                                  )}                                
                                </div>
                              </div>
                            );
                          })}
                          <h5 className="price">PRICE:</h5>
                          <div className="price_amount">
                            {item.prices.map((item, index) => {
                              return (
                                <div key={index}>
                                  {item.currency.label === context.currency && (
                                    <p
                                      key="index"
                                      className="cart_content_price"
                                    >
                                      {item.currency.label} {item.amount}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <button
                            data-cart={item}
                            onClick={() => addToCart({product:item, attributes: this.state.attributes, quantity: 1})}
                            className="addtocart_button"
                          >
                            ADD TO CART
                          </button>
                          <p className="description">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </CurrencyContext.Consumer>
          </>
        )}
      </CartContext.Consumer>
    );
  }
}
