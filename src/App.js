import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {keepLogin, cookieChecked} from './actions'
import Header from './components/Header';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductListPage from './components/ProductListPage';
import ManageProduct from './components/ManageProduct';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import History1 from './components/History1';

const cookies = new Cookies();
class App extends Component {
    componentDidMount() {
      const username = cookies.get('dataUser');
      if (username !== undefined) {
        this.props.keepLogin(username)
      }
      else {
        this.props.cookieChecked();
      }
    }


    render() {
      if (this.props.cookie){
        return (
          <div>
            <Header navBrand={"ID-Commerce"}/>
            <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/productlist" component={ProductListPage} />
            <Route path="/manageproduct" component={ManageProduct} />
            <Route path="/detailproduct" component={ProductDetail} />
            <Route path="/cart" component={Cart} />
            <Route path="/history" component={History1} />
            </div>
          </div>
        );
      }
      return (<div>
        <center><i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/></center>
        </div>)
    }
}
    

const mapStateToProps = (state) => {
  return {cookie: state.auth.cookie}
}

export default withRouter(connect(mapStateToProps,{keepLogin,cookieChecked})(App));
