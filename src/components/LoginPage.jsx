import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {onUserLogin} from '../actions'

const cookies = new Cookies();

class LoginPage extends Component {

    componentWillReceiveProps(newProps) {
        if (newProps.username !== '') {
            cookies.set('dataUser', newProps.username, {path: '/'})
        }
    }
    
    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        this.props.onUserLogin({username,password})
    }

    renderError = () => {
        if (this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    renderButtonLogin = () => {
        if (this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return (
            <div className="form-group">
                <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Log In" onClick ={this.onBtnLoginClick}/>
            </div>
        )
    }
    
    render() {
        if(this.props.username === "")
        {
            return (
                <div className= "bodyRegister"> 
                    <div className="main">
                        <section className="signup">
                            <div className="container1">
                                <div className="signup-content">
                                    <form method="POST" id="signup-form" className="signup-form">
                                        <center>
                                        <h4 className="form-title">It's Nice to See You Back!</h4>
                                        <p>Please enter your username and password</p>
                                        </center>
                                        <div><br/></div>
                                        <div className="form-group">
                                            <input type="text" className="form-input" ref="username" name="username" id="username" placeholder="Username" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-input" ref="password" name="password" id="password" placeholder="Password" />
                                        </div>
                                        {this.renderError()}
                                        {this.renderButtonLogin()}
                                    </form>
                                    <p className="loginhere">
                                        Don't have any account yet? <a href="/register" className="loginhere-link">Register here</a>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> 
            )
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username, 
        error: state.auth.error,
        loading: state.auth.loading};
    }


export default connect(mapStateToProps,{onUserLogin})(LoginPage);