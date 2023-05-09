import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const loginUrl = 'https://apis.ccbp.in/login'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginStatus: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({loginStatus: true, errorMsg})
  }

  onSubmitLogin = async event => {
    const {username, password} = this.state
    const userDetails = {username, password}
    event.preventDefault()

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  saveUsername = event => {
    this.setState({username: event.target.value})
  }

  savePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, loginStatus, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const loginForm = (
      <div className="login-page-cont">
        <div className="user-login-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitLogin}>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="user-input"
              value={username}
              onChange={this.saveUsername}
            />
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="user-input"
              value={password}
              onChange={this.savePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {loginStatus ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
    return loginForm
  }
}

export default Login
