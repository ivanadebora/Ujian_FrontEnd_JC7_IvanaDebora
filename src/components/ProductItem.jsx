import React, { Component} from 'react';
import {connect} from 'react-redux';
import { select_product, addToCart} from '../actions'


const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductItem extends Component {

    onItemClick = () => {
        this.props.select_product(this.props.product);
    }

    render() {
        const {img, nama, merk, harga } = this.props.product
        return (
            <div onClick={this.onItemClick} className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                <i className="fas fa-plus fa-3x" />
                </div>
              </div>
              <img className="img-fluid" src={img} alt="popokbayi" />
              </a>
              <div className="portfolio-caption">
              <h4>{nama}</h4>
              <p>{merk}</p>
              <b><p className="text-muted">{rupiah.format(harga)}</p></b>
              </div>
          </div>
        )
    }
}

export default connect(null,{select_product, addToCart}) (ProductItem);