import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {authUser} from "../store/actions/auth";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm"; 

const Main = props => {
    const { authUser, errors, removeError, currentUser} = props;
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={ props => <Homepage currentUser={currentUser} {...props} /> } />
                <Route 
                    exact 
                    path="/signin" 
                    render={props => {
                        return (
                            <AuthForm removeError={removeError} errors={errors} onAuth={authUser} buttonText="Log In" heading="Welcome Back." {...props} />
                        );
                    }} 
                />
                <Route  
                    exact 
                    path="/signup" 
                    render={props => {
                        return (
                            <AuthForm signUp removeError={removeError} errors={errors} onAuth={authUser} buttonText="SignUp" heading="Join Us today." {...props} />
                        );
                    }} 
                />
                <Route 
                    path="/users/:id/messages/new"
                    component={withAuth(MessageForm)}
                />
            </Switch>
        </div>
    );
};

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main)); 