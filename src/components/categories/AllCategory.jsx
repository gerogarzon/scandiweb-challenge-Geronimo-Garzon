import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/categories.css";
import cart from "../../resources/cart.png";
import CurrencyContext from "../../context/CurrencyContext";
import CartContext from "../../context/CartContext";
import {query_all} from "./queries"
class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      products: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `${query_all}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          category: res.data.category.name,
          products: res.data.category.products,
        });
      });
  }

  render() {
    return (
      <CartContext.Consumer>
        {({ backgroundColor }) => (
          <>
            <CurrencyContext.Consumer>
              {(context) => (
                <>
                  <h1
                    style={{ opacity: backgroundColor }}
                    className="categoryTitle"
                  >
                    {" "}
                    Category {this.state.category}
                  </h1>
                  <div
                    style={{ opacity: backgroundColor }}
                    className="grid_container"
                  >
                    {this.state.products.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{ backgroundColor: backgroundColor }}
                          className="grid_items"
                        >
                          {item.inStock === true ? (
                            <>
                              <Link
                                className="link"
                                to={`/pdp?productID=${item.id}`}
                              >
                                <div className="card_image_cart_container">
                                  <img
                                    src={item.gallery[0]}
                                    className="card_image"
                                    alt="product"
                                  />
                                  <button className="card_cart">
                                    <img src={cart} alt="cart" />
                                  </button>
                                </div>
                                <div className="card_content">
                                  <h4 className="card_content_title">
                                    {item.name}
                                  </h4>
                                  {item.prices.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        {item.currency.label ===
                                          context.currency && (
                                          <p
                                            key="index"
                                            className="card_content_price"
                                          >
                                            {item.currency.label} {item.amount}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </Link>
                            </>
                          ) : (
                            <>
                              <img
                                src={item.gallery[0]}
                                className="card_image OutOfStock"
                                alt="product"
                              />
                              <div className="textoverlay">OUT OF STOCK</div>
                              <div className="card_content OutOfStock">
                                <h4 className="card_content_title OutOfStock">
                                  {item.name}
                                </h4>
                                {item.prices.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.currency.label ===
                                        context.currency && (
                                        <p
                                          key="index"
                                          className="card_content_price"
                                        >
                                          {item.currency.label} {item.amount}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </CurrencyContext.Consumer>
          </>
        )}
      </CartContext.Consumer>
    );
  }
}

export default AllCategory;
