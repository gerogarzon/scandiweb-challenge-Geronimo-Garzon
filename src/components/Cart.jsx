import React, { Component } from "react";
import CartContext from "../context/CartContext";
import CurrencyContext from "../context/CurrencyContext";
import { Link } from "react-router-dom";

import "../css/cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let actualState = this.state.cartOpen;
    this.setState({ cartOpen: !actualState });
  }

  render() {
    return (
      <CurrencyContext.Consumer>
        {(context) => (
          <>
            <CartContext.Consumer>
              {({ productsInCart, changeBackgorundColor, removeFromCart }) => (
                <>
                  <div className="cart_container">
                    <div
                      onClick={() => {
                        this.handleClick();
                        changeBackgorundColor();
                      }}
                      className="cart_container_button"
                    >
                      {productsInCart.length > 0 && (
                        <div className="cart_length">
                          {productsInCart.length}
                        </div>
                      )}
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M 19.5613 4.87359 C 19.1822 4.41031 18.5924 4.12873 17.9821 4.12873 H 5.15889 L 4.75914 2.63901 C 4.52718 1.77302 3.72769 1.16895 2.80069 1.16895 H 0.653099 C 0.295301 1.16895 0 1.45052 0 1.79347 C 0 2.13562 0.294459 2.418 0.653099 2.418 H 2.80069 C 3.11654 2.418 3.39045 2.61936 3.47434 2.92139 L 6.04306 12.7077 C 6.27502 13.5737 7.07451 14.1778 8.00152 14.1778 H 16.4028 C 17.3289 14.1778 18.1507 13.5737 18.3612 12.7077 L 19.9405 6.50575 C 20.0877 5.941 19.9619 5.33693 19.5613 4.87365 L 19.5613 4.87359 Z M 18.6566 6.22252 L 17.0773 12.4245 C 16.9934 12.7265 16.7195 12.9279 16.4036 12.9279 H 8.00154 C 7.68569 12.9279 7.41178 12.7265 7.32789 12.4245 L 5.49611 5.39756 H 17.983 C 18.1936 5.39756 18.4042 5.49824 18.5308 5.65948 C 18.6567 5.81994 18.7192 6.0213 18.6567 6.22266 L 18.6566 6.22252 Z"
                            fill="#43464E"
                          />
                          <path
                            d="M 8.44437 14.9814 C 7.2443 14.9814 6.25488 15.9276 6.25488 17.0751 C 6.25488 18.2226 7.24439 19.1688 8.44437 19.1688 C 9.64445 19.1696 10.6339 18.2234 10.6339 17.0757 C 10.6339 15.928 9.64436 14.9812 8.44437 14.9812 V 14.9814 Z M 8.44437 17.9011 C 7.9599 17.9011 7.58071 17.5385 7.58071 17.0752 C 7.58071 16.6119 7.9599 16.2493 8.44437 16.2493 C 8.92885 16.2493 9.30804 16.6119 9.30804 17.0752 C 9.30722 17.5188 8.90748 17.9011 8.44437 17.9011 Z"
                            fill="#43464E"
                          />
                          <path
                            d="M 15.6875 14.9814 C 14.4875 14.9814 13.498 15.9277 13.498 17.0752 C 13.498 18.2226 14.4876 19.1689 15.6875 19.1689 C 16.8875 19.1689 17.877 18.2226 17.877 17.0752 C 17.8565 15.9284 16.8875 14.9814 15.6875 14.9814 Z M 15.6875 17.9011 C 15.2031 17.9011 14.8239 17.5385 14.8239 17.0752 C 14.8239 16.612 15.2031 16.2493 15.6875 16.2493 C 16.172 16.2493 16.5512 16.612 16.5512 17.0752 C 16.5512 17.5188 16.1506 17.9011 15.6875 17.9011 Z"
                            fill="#43464E"
                          />
                        </svg>
                      </div>
                    </div>
                    {this.state.cartOpen && (
                      <div className="cart_items_content">
                        <div className="cart_items_title_container">
                          <b className="cart_items_title">My Bag,</b>
                          <div className="cart_items_length">
                            {productsInCart.length} items
                          </div>
                        </div>
                        {productsInCart.map((item, index) => {
                          return (
                            <div key={index} className="cart_items_products">
                              <div className="cart_items_products_col col1">
                                <div>{item.brand}</div>
                                <div>{item.name}</div>
                                <div>
                                  {item.prices.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        {item.currency.label ===
                                          context.currency && (
                                          <b
                                            key="index"
                                            className="cart_content_price"
                                          >
                                            {item.currency.label} {item.amount}
                                          </b>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  {item.attributes.map((attribute, index) => {
                                    return (
                                      <div key={index}>
                                        <div>{attribute.id}:</div>
                                        {attribute.id === "Color" ? (
                                          <div
                                            style={{
                                              backgroundColor: attribute.value,
                                            }}
                                            className="colorType"
                                          ></div>
                                        ) : (
                                          <div className="attribute_value">
                                            {attribute.value}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="cart_items_products_col col2">
                                <button className="button_add">+</button>
                                <div className="product_quantity">
                                  {productsInCart.length}
                                </div>
                                <button
                                  data-id={item.name}
                                  onClick={removeFromCart}
                                  className="button_subtract"
                                >
                                  -
                                </button>
                              </div>
                              <div className="cart_items_products_col col3">
                                <img
                                  className="image"
                                  src={item.gallery[0]}
                                  alt="product"
                                />
                              </div>
                            </div>
                          );
                        })}
                        <div className="total">
                          <b className="total_title">Total</b>
                          <b className="total_amount">
                            {productsInCart.length}
                          </b>
                        </div>
                        <div className="checkout_buttons">
                          <Link
                            to="/cartdetail"
                            className="viewbag"
                            onClick={() => {
                              this.handleClick();
                              changeBackgorundColor();
                            }}
                          >
                            VIEW BAG
                          </Link>
                          <Link
                            to="/cartdetail"
                            className="checkout"
                            onClick={() => {
                              this.handleClick();
                              changeBackgorundColor();
                            }}
                          >
                            CHECK OUT
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CartContext.Consumer>
          </>
        )}
      </CurrencyContext.Consumer>
    );
  }
}
