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
      attributes: [],
    };
    this.handleClick = (e) => {
      let data = e.currentTarget.getAttribute("src");
      this.setState({ mainImage: data });
    };
    this.attributes = async (e) => {
      let data = e;
      let state = this.state.attributes;
      let alreadyInCart = state.some((element) => {
        return element.id === data.id;
      });

      //  if state is empty save the data
      if (state.length === 0) {
        await this.setState({ attributes: [data] });
      } else {
        // if not empty, and, not same type of attribute, save the previus attribute and the new one so i can pick up more than one diferent attribute
        if (!alreadyInCart) {
          await this.setState({ attributes: [...this.state.attributes, data] });
        }
        // if it the same type of attribute only save the new one
        else {
          await this.setState({ attributes: [data] });
        }
      }
    };
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
    let query = new URLSearchParams(window.location.search);
    let id = query.get("productID");
    return (
      <CartContext.Consumer>
        {({ addToCart, backgroundColor }) => (
          <>
            <CurrencyContext.Consumer>
              {(context) => (
                <>
                  {this.state.product.map((item, inde) => {
                    return (
                      <div
                        key={inde}
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
                                            <input
                                              key={item.id}
                                              type="button"
                                              required
                                              onClick={() =>
                                                this.attributes({
                                                  id: itm.id,
                                                  value: item.value,
                                                })
                                              }
                                              className="attributes_buttons typeColor"
                                              style={{
                                                backgroundColor: item.value,
                                              }}
                                            />
                                          );
                                        })}
                                      </>
                                    ) : (
                                      <>
                                        {itm.items.map((item) => {
                                          return (
                                            <input
                                              key={item.id}
                                              type="button"
                                              required
                                              defaultValue={item.value}
                                              onClick={() =>
                                                this.attributes({
                                                  id: itm.id,
                                                  value: item.value,
                                                })
                                              }
                                              className="attributes_buttons"
                                            />
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
                                    {item.currency.label ===
                                      context.currency && (
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
                              type="submit"
                              data-cart={item}
                              onClick={() =>
                                addToCart({
                                  product: item,
                                  attributes: this.state.attributes,
                                  quantity: 1,
                                  id:
                                    id +
                                    this.state.attributes.map((e) => {
                                      return e.id + e.value;
                                    }),
                                })
                              }
                              className="addtocart_button"
                            >
                              ADD TO CART
                            </button>
                            <p
                              className="description"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></p>
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
ProductDetail.contextType = CartContext;
