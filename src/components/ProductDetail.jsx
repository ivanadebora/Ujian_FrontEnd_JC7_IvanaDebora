import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import {select_product} from '../actions'



class ProductDetail extends Component {

    state = {totalPrice:0}

    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var productId = params.product_id
        console.log(productId)
        axios.get( `http://localhost:2018/product/${productId}`)
        .then((res) => {
            this.props.select_product(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnCartClick = () => {
        var idproduct = this.props.product.id
        var namaProduk = this.props.product.nama
        var img = this.props.product.img
        var price = this.props.product.harga
        var qty = this.refs.qty.value
        
        axios.post('http://localhost:2018/cart' , {
          idproduct : idproduct,
          namaProduk: namaProduk,
          img : img,
          price : price,
          qty : qty,
          totalHarga: price*qty,
        }).then((res) => {
          console.log(res)
          alert('Produk berhasil dimasukan ke Keranjang')
          this.props.addToCart() 
        }).catch((err) => {
          console.log(err)
        })
        }


    render() {
        var {nama, merk, jenis, harga, img, description} = this.props.product
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" >
                        <img src={img} alt={img} className="img-responsive"  />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h3>{jenis}</h3>
                        </div>
                        <div className="row">
                            <h4>Rp. {harga}</h4>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div className="row">
                            <h4>Pesan:</h4>
                        </div>
                        <div className="row">
                            <input type="number" style={{ marginLeft:'10px' , width: '60px' , marginRight:'10px'}} className="form-input" ref="qty" name="qty" id="qty" defaultValue = "1"/> 
                            <span></span>
                            <input type="button" className=" btn btn-success" value="Add to Cart" onClick={this.onBtnCartClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { product: state.selectedProduct}
}

export default connect(mapStateToProps, {select_product}) (ProductDetail);