import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {onUserRegister} from '../actions'

const cookies = new Cookies();

class RegisterPage extends Component {

    componentWillReceiveProps(newProps) {
        if (newProps.username !== '') {
            cookies.set('dataUser', newProps.username, {path: '/'})
        }
    }

    renderError = () => {
        if (this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    renderButtonRegister = () => {
        if (this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return (<div className="form-group">
        <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Register" onClick ={this.onBtnRegisterClick}/>
    </div>)
    }  
    
    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({username,email,password});
    }

    render() {
        if (this.props.username === "") {
            return (
                <div className= "bodyRegister"> 
                    <div className="main">
                        <section className="signup">
                            <div className="container1">
                                <div className="signup-content">
                                    <form method="POST" id="signup-form" className="signup-form">
                                        <h2 className="form-title">Let's Join the Club!</h2>
                                        <center><p>Please fill the form below</p></center>
                                        <div><br/></div>
                                        <div className="form-group">
                                            <input type="text" className="form-input" ref="username" name="username" id="username" placeholder="Username" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-input" ref="email" name="email" id="email" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-input" ref="password" name="password" id="password" placeholder="Password" />
                                        </div>
                                        {this.renderError()}
                                        {this.renderButtonRegister()}
                                    </form>
                                    <p className="loginhere">
                                        Already have an account ? <a href="/login" className="loginhere-link">Login here</a>
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

export default connect(mapStateToProps,{onUserRegister})(RegisterPage);