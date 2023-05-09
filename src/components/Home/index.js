import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const homePage = (
    <div className="home-page-cont">
      <Header />
      <div className="discover-info">
        <h1 className="welcome-heading">Find The Job That Fits Your Life</h1>
        <p className="app-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="btn-link">
          <button type="button" className="find-job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
  return homePage
}

export default Home
