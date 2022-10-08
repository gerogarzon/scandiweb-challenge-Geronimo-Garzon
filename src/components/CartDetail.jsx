import React, { Component } from "react";
import CartContext from "../context/CartContext";
import CurrencyContext from "../context/CurrencyContext";
import "../css/cartdetail.css";

export default class CartDetail extends Component {
  render() {
    return (
      <>
        <CartContext.Consumer>
          {({ productsInCart }) => (
            <>
              <CurrencyContext.Consumer>
                {(context) => (
                  <>
                    <div className="cartdetail_container">
                      <div className="title">CART</div>
                      {productsInCart.length === 0 && <em className="empty_cart">No products added</em>}
                        {productsInCart.map((item, index) => {
                            return (
                                <>
                                
                              <div className="products_container">
                              <div key={index} className="products_items">
                                <div className="products_items_col colone">
                                  <b>{item.brand}</b>
                                  <div>{item.name}</div>
                                  <div>
                                    {item.prices.map((item, index) => {
                                      return (
                                        <div key={index}>
                                          {item.currency.label ===
                                            context.currency && (
                                            <p
                                              key="index"
                                              className="card_content_price"
                                            >
                                              {item.currency.label}{" "}
                                              {item.amount}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="products_items_col coltwo">
                                  <button className="add_button">+</button>
                                  <div className="quantity">
                                    {productsInCart.length}
                                  </div>
                                  <button className="subtract_button">-</button>
                                </div>
                                <div className="products_items_col colthird">
                                  <img
                                    className="img"
                                    src={item.gallery[0]}
                                    alt="product"
                                  />
                                </div>
                              </div>
                              </div>
                            </>
                          );
                        })}
                      <div className="total_container"></div>
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
