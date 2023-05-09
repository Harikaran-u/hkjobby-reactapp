import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLogOut} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const header = (
    <ul className="nav-header">
      <Link to="/" className="link">
        <li className="img-link">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <ul className="nav-links">
        <Link to="/" className="link">
          <li className="route-links">Home</li>
          <AiFillHome className="nav-icon" />
        </Link>

        <Link to="/jobs" className="link">
          <li className="route-links">Jobs</li>
          <BsFillBriefcaseFill className="nav-icon" />
        </Link>

        <BiLogOut className="nav-icon" onClick={logoutUser} />
      </ul>
      <button type="button" className="logout-btn" onClick={logoutUser}>
        Logout
      </button>
    </ul>
  )
  return header
}

export default withRouter(Header)
