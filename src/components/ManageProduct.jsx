import React, {Component} from 'react';
import axios from 'axios';
import '../supports/css/tabelproduct.css';
import { API_URL } from '../supports/api-url/api-url';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ManageProduct extends Component {

      state = { listProduct: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getProductList();
      }

    getProductList = () => {
        axios.get(API_URL+'/product')
    
        .then((res) => {
            console.log(res.data)
            this.setState({listProduct: res.data})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merk = this.refs.merkAdd.value;
        var jenis = this.refs.jenisAdd.value;
        var harga = parseInt(this.refs.hargaAdd.value);
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post(API_URL+'/product', {
            nama, merk, jenis, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.getProductList()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }


    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var merk = this.refs.merkEdit.value;
        var jenis = this.refs.jenisEdit.value;
        var harga = parseInt(this.refs.hargaEdit.value);
        var img = this.refs.imgEdit.value;
        var description = this.refs.descEdit.value;

        axios.put(API_URL+'/product/'+id, {
            nama, merk, jenis, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.setState({idSelectedtoEdit:0})
            this.getProductList()
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure to delete this item?')){
            axios.delete(API_URL+'/product/' + id)
            .then((res) => {
                this.getProductList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

     
    renderBodyProduct = () => {
        var listJSXProduct = this.state.listProduct.map(({id,nama,merk,jenis,harga,img,description}) => {
            if (this.state.idSelectedtoEdit === id) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama}/></td>
                        <td><input type="text" ref="merkEdit" defaultValue={merk}/></td>
                        <td><select ref="jenisEdit" defaultValue={jenis}>
                                    <option>Elektronik</option>
                                    <option>Pakaian</option>
                                    <option>Makanan</option>
                                </select></td>
                        <td><input type="number" ref="hargaEdit" defaultValue={rupiah.format(harga)}/></td>
                        <td><input type="text" ref="imgEdit" defaultValue={img}/></td>
                        <td><textarea ref="descEdit" defaultValue={description}/></td>
                        <td><input className="btn btn-success" type="button" value="Save"  onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({idSelectedtoEdit:0})} /></td>
                    </tr>
                    )
            }
            return (
                <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merk}</td>
                        <td>{jenis}</td>
                        <td>{rupiah.format(harga)}</td>
                        <td><img src={img} width="50px" alt={nama} /></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit"  onClick={() => this.onBtnEditClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={()=> this.onBtnDeleteClick(id)}/></td>
                    </tr>
            )
             
        })
        return listJSXProduct;
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Manage Product</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Jenis</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduct()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="namaAdd" placeholder="Nama Product"/></td>
                            <td><input type="text" ref="merkAdd" placeholder="Merk"/></td>
                            <td><select ref="jenisAdd">
                                    <option>Elektronik</option>
                                    <option>Pakaian</option>
                                    <option>Makanan</option>
                                </select></td>
                            <td><input type="number" ref="hargaAdd" placeholder="Harga Product"/></td>
                            <td><input type="text" ref="imgAdd" placeholder="Image URL"/></td>
                            <td><textarea ref="descAdd" placeholder="Enter your description about product"/></td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            )
    }
}
        
   


export default ManageProduct;