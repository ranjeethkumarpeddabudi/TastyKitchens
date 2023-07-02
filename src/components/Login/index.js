import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const responseData = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(responseData.jwt_token)
    } else {
      this.setState({showPassword: true, errorMsg: responseData.error_msg})
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-section">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687462292/Group_7420_ke98th.png"
                alt="website logo"
                className="login-logo"
              />
            </div>
            <div className="title-container">
              <h1 className="title">Tasty Kitchens</h1>
            </div>
            <div className="login-title-container">
              <h1 className="login-title">Login</h1>
            </div>
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={this.onChangeName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {showPassword ? <p className="error-message">{errorMsg}</p> : null}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687457186/Rectangle_1456_lknvoy.png"
          alt="website login"
          className="login-image"
        />
      </div>
    )
  }
}

export default Login
