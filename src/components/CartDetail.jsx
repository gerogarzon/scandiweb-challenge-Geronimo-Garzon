import React, { Component } from "react";
import CartContext from "../context/CartContext";
import CurrencyContext from "../context/CurrencyContext";
import "../css/cartdetail.css";

export default class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }
  render() {
    return (
      <>
        <CartContext.Consumer>
          {({ productsInCart, addQuantity, removeFromCart }) => (
            <>
              <CurrencyContext.Consumer>
                {(context) => (
                  <>
                    <div className="cartdetail_container">
                      <div className="title">CART</div>
                      {productsInCart.length === 0 && (
                        <em className="empty_cart">No products added</em>
                      )}
                      {productsInCart.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="products_container">
                              <div className="products_items">
                                <div className="products_items_col colone">
                                  <b className="product_brand">{item.brand}</b>
                                  <div className="product_name">
                                    {item.name}
                                  </div>
                                  <div>
                                    {item.prices.map((item, index) => {
                                      return (
                                        <div key={index}>
                                          {item.currency.label ===
                                            context.currency && (
                                            <p
                                              key="index"
                                              className="item_price"
                                            >
                                              {item.currency.label}{" "}
                                              {item.amount}
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
                                                backgroundColor:
                                                  attribute.value,
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
                                    data-id={item.name}
                                    onClick={addQuantity}
                                  >
                                    +
                                  </button>

                                  <div key={index} className="quantity">
                                    {item.quantity}
                                  </div>

                                  <button
                                    className="subtract_button"
                                    data-id={item.name}
                                    onClick={removeFromCart}
                                  >
                                    -
                                  </button>
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
                          </div>
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
