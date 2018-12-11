import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {onUserLogout} from '../actions'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const cookies = new Cookies()   

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    // state = {jumlah :0}

    // componentDidMount = () => {
    //     this.getApiCart()
    // }

    // getApiCart = () => {
    //     axios.get('http://localhost:1212/cart', {
    //         params : {
    //         username : this.props.username
    //     }
    //     }).then((res) => {
    //         console.log(res.data.length)
    //         this.setState({jumlah : res.data.length})
    //     })
    // }

    // renderCart = () => {
    //     return(
    //     <Button href='/cart'>
    //         <i class="fas fa-shopping-cart" style={{marginRight:'15px'}}> My Cart</i>
    //         {this.state.jumlah}
    //     </Button>
    //     )
    // }

    onLogoutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('dataUser')
    }

    render () {
        if(this.props.username === "" ) {
            return (
                <div>
                    <Navbar style={{backgroundColor:'black'}} expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar  style={{color:'yellow'}} >
                                <NavItem>
                                    <Link to="/productlist"><NavLink>Product List</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/register"><NavLink>Register</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><NavLink >Login</NavLink></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
                <Navbar style={{backgroundColor:'black'}} expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href='/productlist'>Product List</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/manageproduct">Manage Product</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/cart">Cart</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onLogoutSelect}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username}
}

export default connect(mapStateToProps, {onUserLogout})(Header);