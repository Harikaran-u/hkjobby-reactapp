import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiMap} from 'react-icons/bi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const jobDetailsConst = {
  success: 'success',
  failure: 'failure',
}

const loader = (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

class JobsDetailsItem extends Component {
  state = {
    jobIdStatus: '',
    isLoadingJobId: true,
    newJobDetails: {},
    newSimilarJobs: [],
    newSkills: [],
    newLifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobIdDetails()
  }

  jobIdSuccess = data => {
    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = updatedData
    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
      title: jobDetails.title,
    }
    const updatedSimilarJobs = similarJobs.map(eachSimilar => ({
      companyLogoUrl: eachSimilar.company_logo_url,
      employmentType: eachSimilar.employment_type,
      id: eachSimilar.id,
      jobDescription: eachSimilar.job_description,
      location: eachSimilar.location,
      rating: eachSimilar.rating,
      title: eachSimilar.title,
    }))
    const {lifeAtCompany, skills} = updatedJobDetails
    const updatedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    const updatedSkills = skills.map(eachSkills => ({
      name: eachSkills.name,
      imageUrl: eachSkills.image_url,
    }))

    this.setState({
      jobIdStatus: 'success',
      isLoadingJobId: false,
      newJobDetails: updatedJobDetails,
      newSimilarJobs: updatedSimilarJobs,
      newSkills: updatedSkills,
      newLifeAtCompany: updatedLifeAtCompany,
    })
  }

  jobIdFailure = () => {
    this.setState({isLoadingJobId: false, jobIdStatus: 'failure'})
  }

  getJobIdDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobsIdUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsIdUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.jobIdSuccess(data)
    } else {
      this.jobIdFailure()
    }
  }

  renderJobsIdSuccessView = () => {
    const {
      newJobDetails,
      newLifeAtCompany,
      newSkills,
      newSimilarJobs,
    } = this.state

    const {description, imageUrl} = newLifeAtCompany

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = newJobDetails
    console.log(newJobDetails)

    const displayJobItem = (
      <div className="job-item-cont">
        <div className="logo-top-cont">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-company-logo"
          />
          <div className="title-rating-cont-job-id">
            <h1 className="job-id-title">{title}</h1>
            <div className="star-cont">
              <AiFillStar className="id-star" />
              <p className="ratings-des">{rating}</p>
            </div>
          </div>
        </div>
        <div className="full-details-cont">
          <div className="location-icons-cont">
            <BiMap className="id-icon" />
            <p className="job-id-location">{location}</p>
            <BsFillBriefcaseFill className="id-icon" />
            <p className="job-id-emp-type">{employmentType}</p>
          </div>
          <p className="package-job-id">{packagePerAnnum}</p>
        </div>
        <hr size="3" className="hr-line" />
        <div className="description-visit-id">
          <h1 className="id-description">Description</h1>
          <div className="visit-link-cont">
            <a className="web-link" href={companyWebsiteUrl}>
              Visit
            </a>
            <FiExternalLink className="id-icon" />
          </div>
        </div>
        <p className="job-id-description">{jobDescription}</p>
        <h1 className="id-skills">Skills</h1>
        <ul className="skills-list-cont">
          {newSkills.map(eachSkills => {
            const skillCard = (
              <li className="skill-list" key={eachSkills.name}>
                <img
                  src={eachSkills.imageUrl}
                  alt={eachSkills.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkills.name}</p>
              </li>
            )
            return skillCard
          })}
        </ul>
        <h1 className="id-description">Life at Company</h1>
        <div className="life-at-company-cont">
          <p className="life-description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-company-img"
          />
        </div>
        <h1 className="id-description">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {newSimilarJobs.map(eachSimilar => (
            <SimilarJobsCard key={eachSimilar.id} similar={eachSimilar} />
          ))}
        </ul>
      </div>
    )

    return displayJobItem
  }

  renderJobsIdFailureView = () => {
    const jobsFailure = (
      <div className="jobs-id-fail-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-id-failure-img"
        />
        <h1 className="failure-id-head-job">Oops! Something Went Wrong</h1>
        <p className="failure-id-description-job">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="job-id-retry-btn"
          onClick={this.getJobIdDetails}
        >
          Retry
        </button>
      </div>
    )
    return jobsFailure
  }

  renderJobIdDisplayViews = () => {
    const {jobIdStatus} = this.state
    switch (jobIdStatus) {
      case jobDetailsConst.success:
        return this.renderJobsIdSuccessView()
      case jobDetailsConst.failure:
        return this.renderJobsIdFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoadingJobId} = this.state
    const displayDetails = (
      <div className="job-id-bg-cont">
        <Header />
        {isLoadingJobId ? loader : this.renderJobIdDisplayViews()}
      </div>
    )
    return displayDetails
  }
}

export default JobsDetailsItem
