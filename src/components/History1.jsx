import React, {Component} from 'react';
import axios from 'axios';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class History1 extends Component {
    state = {listHistory : []}

    componentDidMount(){
        this.renderListHistory()
    }

    renderListHistory = () => {
        axios.get('http://localhost:2018/history' , {
            params : {
                username : this.props.username
            }
        })
        .then((res) => {
            console.log(res)
            this.setState({listHistory : res.data})
        })
        var listHistoryJSX = this.state.listHistory.map(({id,username,tglTrans,totalItem,totalHarga}) => {
            return(
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{tglTrans}</td>
                    <td style={{width:'20px'}}>{totalItem}</td>
                    <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                    <td><input className="btn btn-primary" type='button' value='Detail'/></td>
                </tr>
            )
        })
        return listHistoryJSX;
    }
    render() {
        return (
            <div className='container'>
                <center>
                    <h1 style={{marginTop:'20px'}}>My Cart</h1>
                </center>
                <table style={{marginTop:'40px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Tanggal Transaksi</th>
                            <th>Total Item</th>
                            <th>Total Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>
                </div>
        )
    }

}

export default History1;