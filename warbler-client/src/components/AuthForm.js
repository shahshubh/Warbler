import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    handleSubmit = e => {
        debugger;
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props
        .onAuth(authType, this.state)
        .then(() => {    
            this.props.history.push("/");
        })
        .catch(() => {
            return;
        });
    }

    render(){
        const {email, username, password, profileImageUrl} = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;
        console.log(history);
        history.listen(() => {
            removeError();
        });
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            { errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            <label htmlFor="email">E-mail:</label>
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email}  
                                type="text" 
                            />
                            <label htmlFor="password">Password:</label>
                            <input 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                onChange={this.handleChange}   
                                type="password" 
                            />
                            {/* If signUp is true which is passed in from Main component then we render 2 extra input fields */}
                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                        className="form-control" 
                                        id="username" 
                                        name="username" 
                                        onChange={this.handleChange} 
                                        value={username}  
                                        type="text" 
                                    />
                                    <label htmlFor="image-url">Image URL:</label>
                                    <input 
                                        className="form-control" 
                                        id="image-url" 
                                        name="profileImageUrl" 
                                        onChange={this.handleChange}
                                        value={profileImageUrl}
                                        type="text" 
                                    />

                                </div>
                            )}
                            <button style={{ marginTop: "15px" }} type="submit" className="btn btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AuthForm.propTypes = {
    buttonText: PropTypes.string,
    errors: PropTypes.object,
    heading: PropTypes.string,
    history: PropTypes.object,
    onAuth: PropTypes.func,
    signIn: PropTypes.bool,
    removeError: PropTypes.func
};

export default AuthForm;