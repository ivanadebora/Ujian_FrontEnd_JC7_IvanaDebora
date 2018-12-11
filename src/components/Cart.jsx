import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../supports/api-url/api-url';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class Cart extends Component {
    
    state = {listCart : [], idSelectedtoEdit: 0}
    
    componentDidMount(){
        this.getListCart()
    }

    getListCart = () => {
        axios.get(API_URL+'/cart')
        .then((res) => {
            console.log(res)
            this.setState({listCart : res.data})
        })
        .catch((err) => {
        console.log (err)
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }

    onBtnSaveClick = (id) => {
        var qty = parseInt(this.refs.qtyEdit.value);
        axios.put(API_URL+'/cart/'+id, {
            qty
        })
        .then((res) => {
            console.log(res)
            this.setState({idSelectedtoEdit:0})
            this.getListCart()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnRemoveClick = (id) => {
        if(window.confirm('Are sure to remove this item?')){
            axios.delete('http://localhost:2018/cart/' + id)
            .then((res) => {
                this.getListCart();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    renderBodyCart = () => {
        var listCartJSX = this.state.listCart.map(({id, img, namaProduk, price, qty, totalHarga}) => {
            if (this.state.idSelectedtoEdit === id) {
                return(
                    <tr>
                        <td>{id}</td>
                        <td>{namaProduk}</td>
                        <th><img src={img} width="50px" alt={namaProduk}/></th>
                        <td>{rupiah.format(price)}</td>
                        <td><input type="number" ref="qtyEdit" defaultValue={qty}/></td>
                        <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                        <td><input className="btn btn-success" type="button" value="Save"  onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({idSelectedtoEdit:0})}/></td>
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{id}</td>
                    <td>{namaProduk}</td>
                    <td><img src={img} width="50px" alt={namaProduk}/></td>
                    <td>{rupiah.format(price)}</td>
                    <td style={{width:'20px'}}>{qty}</td>
                    <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                    <td><input className="btn btn-success" type="button" value="Edit"  onClick={() => this.onBtnEditClick(id)}/></td>
                    <td><input className="btn btn-danger" type="button" value="Remove" onClick={() => this.onBtnRemoveClick(id)}/></td>
                </tr>
            )
        })
        return listCartJSX;
    }

  
    onCheckOut = () => {
        if(window.confirm('Are sure to checkout?')){
            var tanggal = new Date()
            var tglTrans = tanggal.getDate()
            axios.post('http://localhost:2018/history', {
                username : this.props.username,
                tglTrans: tglTrans,
                order : this.state.listCart
            })
            .then((res) => {
                //console.log(res)
                for(let i = 0 ; i < this.state.listCart.length ; i ++){
                    axios.delete('http://localhost:2018/cart/' + this.state.listCart)
                    .then((res) => {
                        console.log(res)     
                        this.renderListCart()      
                    })
                }
            })
        }
    }

    renderTotalHarga = () => {
        var total = 0
        for(let i = 0; i < this.state.listCart.length ; i++){
            total += this.state.listCart[i].totalHarga
        }
        return(
            <div className='col-2'>
                <h3>{rupiah.format(total)}</h3>
                <input className="btn btn-primary" type='button' value='Check Out' onClick ={this.onCheckOut}/>
            </div>
        )
    }


    render() {
        if(this.state.listCart.length > 0){
            return (
                <div className='container'>
                    <center>
                        <h1 style={{marginTop:'20px'}}>My Cart</h1>
                    </center>
                    <table style={{marginTop:'40px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyCart()}
                    </tbody>
                    </table>
                    <center>
                        <div><h5>Total Belanja Anda:</h5></div>
                        {this.renderTotalHarga()}
                    </center>
                </div>
            )
        }
        return(
            <center>
                <div className='col-4'>
                    <h1>Keranjang anda kosong</h1>
                    <Link to='/produk'><input type="button" className='btn-primary' value="Lanjutkan Belanja"/></Link>          
                </div>
            </center>
        )
    }
}


const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps) (Cart)