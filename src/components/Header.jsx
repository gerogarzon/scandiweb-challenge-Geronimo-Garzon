import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from "../resources/a-logo.png";
import CurrencyContext from "../context/CurrencyContext";
import Cart from "./Cart"


import "../css/header.css";

  
export default class Header extends Component {
 
  
  render() {  

    return (
      <CurrencyContext.Consumer>
        {context =>(
            <nav className="header">
              <div className="navigation">
                <div className="header_navigation">
                  <Link className="header_navigation_elements" to="/clothescategory">
                    <label className="header_navigation_elements_label">CLOTHES</label>
                  </Link>
                  <Link className="header_navigation_elements" to="/techcategory">
                    <label className="header_navigation_elements_label">TECH</label>
                  </Link>
                  <Link className="header_navigation_elements" to="/">
                    <label className="header_navigation_elements_label" >ALL</label>
                  </Link>
                </div>
              </div>
              <div className="a-logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="actions">      
                    <select id="currency" className="actions_selection" onChange={context.changeCurrency}>               
                      <option value="USD">$ USD</option>
                      <option value="GBP">£ GBP</option>
                      <option value="JPY">¥ JPY</option>
                    </select>      
                <Cart/>
              </div>
            </nav>
      )}
      </CurrencyContext.Consumer>
    );
  }
}

