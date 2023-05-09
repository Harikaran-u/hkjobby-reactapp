import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const profileUrl = 'https://apis.ccbp.in/profile'
let jobTypeArray = []

const statusConst = {
  success: 'success',
  failure: 'failure',
  common: 'common',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const loader = (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

class Jobs extends Component {
  state = {
    isLoading: true,
    profileStatus: '',
    profileData: {},
    jobsDetails: [],
    isLoadingJobs: true,
    jobsStatus: '',
    searchInput: '',
    empType: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  successJobDetails = jobs => {
    const updatedJobs = jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({
      jobsDetails: updatedJobs,
      jobsStatus: 'success',
      isLoadingJobs: false,
    })
  }

  failureJobDetails = () => {
    this.setState({
      jobsDetails: [],
      jobsStatus: 'failure',
      isLoadingJobs: false,
    })
  }

  noJobsDetails = () => {
    this.setState({
      jobsDetails: [],
      jobsStatus: 'common',
      isLoadingJobs: false,
    })
  }

  getJobsDetails = async () => {
    const {searchInput, empType, salaryRange} = this.state

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryRange}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {jobs} = data

      if (jobs.length === 0) {
        this.noJobsDetails()
      } else {
        this.successJobDetails(jobs)
      }
    } else {
      this.failureJobDetails()
    }
  }

  renderJobsSuccessView = () => {
    const {jobsDetails} = this.state
    const jobList = (
      <ul className="job-list-cont">
        {jobsDetails.map(eachJob => (
          <JobCard key={eachJob.id} job={eachJob} />
        ))}
      </ul>
    )
    return jobList
  }

  renderJobsFailureView = () => {
    const jobsFailure = (
      <div className="jobs-fail-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-failure-img"
        />
        <h1 className="failure-head-job">Oops! Something Went Wrong</h1>
        <p className="failure-description-job">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="job-retry-btn"
          onClick={this.getJobsDetails}
        >
          Retry
        </button>
      </div>
    )
    return jobsFailure
  }

  renderNoJobsView = () => {
    const noJobs = (
      <div className="no-jobs-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-head">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
    return noJobs
  }

  renderJobsDisplayViews = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case statusConst.success:
        return this.renderJobsSuccessView()
      case statusConst.failure:
        return this.renderJobsFailureView()
      case statusConst.common:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  onProfileSuccess = profile => {
    const profileData = {
      profileImageUrl: profile.profile_image_url,
      name: profile.name,
      shortBio: profile.short_bio,
    }
    this.setState({isLoading: false, profileData, profileStatus: 'success'})
  }

  onProfileFailure = () => {
    this.setState({isLoading: false, profileData: {}, profileStatus: 'failure'})
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onProfileSuccess(data.profile_details)
    } else {
      this.onProfileFailure()
    }
  }

  profileSuccessView = () => {
    const {profileData} = this.state

    const {name, profileImageUrl, shortBio} = profileData

    const profileEl = (
      <div className="profile-cont">
        <img className="profile-logo" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
    return profileEl
  }

  profileFailureView = () => {
    const profileEl = (
      <div className="profile-failure-cont">
        <button
          className="retry-profile-btn"
          type="button"
          onClick={this.getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
    return profileEl
  }

  renderProfileDisplayViews = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case statusConst.success:
        return this.profileSuccessView()
      case statusConst.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  getJobOptions = event => {
    const type = event.target.value

    if (jobTypeArray.includes(type)) {
      jobTypeArray = jobTypeArray.filter(eachItem => eachItem !== type)
      const joinedArray = jobTypeArray.join(',')
      this.setState({empType: joinedArray}, this.getJobsDetails)
    } else {
      jobTypeArray.push(type)
      const newJoinedArray = jobTypeArray.join(',')
      this.setState({empType: newJoinedArray}, this.getJobsDetails)
    }
  }

  getSalaryRange = event => {
    const salaryValue = event.target.value
    this.setState({salaryRange: salaryValue}, this.getJobsDetails)
  }

  renderJobOptions = () => {
    const options = (
      <>
        <ul>
          {employmentTypesList.map(eachItem => (
            <li className="check-el" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                className="check-box"
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
                onChange={this.getJobOptions}
              />
              <label
                htmlFor={eachItem.employmentTypeId}
                className="input-label"
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
    return options
  }

  renderSalaryRange = () => {
    const salary = (
      <>
        <ul>
          {salaryRangesList.map(eachItem => (
            <li className="check-el" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                className="check-box"
                id={eachItem.salaryRangeId}
                name="salary"
                value={eachItem.salaryRangeId}
                onChange={this.getSalaryRange}
              />
              <label htmlFor={eachItem.salaryRangeId} className="input-label">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
    return salary
  }

  updateUserInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchValidJobs = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobsDetails)
  }

  render() {
    const {isLoading, isLoadingJobs, searchInput} = this.state
    const jobsRoute = (
      <div className="jobs-main-cont">
        <Header />
        <div className="display-info-cont">
          <div className="profile-filter-cont">
            {isLoading ? loader : this.renderProfileDisplayViews()}
            <hr size="3" className="hr-line" />
            <div className="employment-type-cont">
              <h1 className="employment-type">Type of Employment</h1>
              {this.renderJobOptions()}
            </div>
            <hr size="3" className="hr-line" />
            <div className="salary-range-cont">
              <h1 className="employment-type">Salary Range</h1>
              {this.renderSalaryRange()}
            </div>
          </div>
          <div className="display-jobs-cont">
            <div className="search-cont">
              <input
                type="search"
                placeholder="Search"
                className="job-search"
                value={searchInput}
                onChange={this.updateUserInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.searchValidJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isLoadingJobs ? loader : this.renderJobsDisplayViews()}
          </div>
        </div>
      </div>
    )
    return jobsRoute
  }
}

export default Jobs
