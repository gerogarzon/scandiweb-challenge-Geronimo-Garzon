// import libraries
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

// import components
import TechCategory from "./components/categories/TechCategory";
import AllCategory from "./components/categories/AllCategory";
import ClothesCategory from "./components/categories/ClothesCategory";
import Header from "./components/Header";
import ProductDetail from "./components/ProductDetail";
import CartDetail from "./components/CartDetail"

// import context
import {CartProvider} from "./context/CartContext";
import {CurrencyProvider} from './context/CurrencyContext';

// import styles
import './App.css';



class App extends React.Component {
  
  render(){
    return (
    <CartProvider>
      <CurrencyProvider>
          <BrowserRouter>
              <Header/>              
                    <Routes>
                      <Route path="/"  element={<AllCategory />}/>
                      <Route path="/techcategory" element={<TechCategory/>}/>
                      <Route path="/clothescategory" element={<ClothesCategory/>}/>
                      <Route path="/pdp" element={<ProductDetail/>}/>
                      <Route path="/cartdetail" element={<CartDetail/>}/>
                    </Routes>                                 
          </ BrowserRouter>
      </CurrencyProvider>
    </CartProvider>
    )  
  }
}


export default App;
