import React from "react";
import ButtonWithProgress from "../Components/ButtonWithProgress";
import Input from '../Components/Input'
class UserSignUpPage extends React.Component {
    state = {
        displayName: '',
        userName: '',
        password: '',
        pendingApiCall: false,
        errors: {}
    }
    onChangeDisplayName = (e) => {
        const errors = { ...this.state.errors }
        delete errors.displayName
        this.setState({ displayName: e.target.value, errors })
    }

    onChangeUserName = (e) => {
        const errors = { ...this.state.errors }
        delete errors.userName
        this.setState({ userName: e.target.value, errors })
    }

    onChangePassword = (e) => {
        const errors = { ...this.state.errors }
        delete errors.password
        this.setState({ password: e.target.value, errors })
    }

    onClickSignUp = () => {
        this.setState({ pendingApiCall: true })
        const user = {
            displayName: this.state.displayName,
            userName: this.state.userName,
            password: this.state.password
        }

        this.props.actions.postSignUp(user)
            .then((response) => {
                this.setState({ pendingApiCall: false })
            })
            .catch(e => {
                let errors = {}
                if (e.response && e.response.data && e.response.data.validationErrors) {
                    errors = { ...e.response.data.validationErrors }
                }
                this.setState({ pendingApiCall: false, errors: errors })
            })
    }
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign up</h1>
                <div className="col-12 mb-3">
                    <Input
                        label='Display Name'
                        onChange={this.onChangeDisplayName}
                        value={this.state.displayName}
                        placeholder='Your Display Name'
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />
                </div>

                <div className="col-12 mb-3">
                    <Input
                        label="User Name"
                        value={this.state.userName}
                        onChange={this.onChangeUserName}
                        placeholder="Your username"
                        hasError={this.state.errors.userName && true}
                        error={this.state.errors.userName}
                    />
                </div>

                <div className="col-12 mb-3">
                    <Input
                        label="Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        type="password"
                        placeholder="Your password"
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}
                    />
                </div>
                <div className="col-12 mb-3 text-center">
                    <ButtonWithProgress
                        disabled={this.state.pendingApiCall}
                        onClick={this.onClickSignUp}
                        text="Sign Up"
                        showProgress={this.state.pendingApiCall}
                    />
                </div>
            </div>
        )
    }
}

UserSignUpPage.defaultProps = {
    actions: {
        postSignUp: () => {
            return new Promise((resolve, reject) => {
                resolve({})
            })
        }
    }
}
export default UserSignUpPage;
//shift alt F