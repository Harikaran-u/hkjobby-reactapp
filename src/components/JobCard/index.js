import {Link} from 'react-router-dom'
import {BiMap} from 'react-icons/bi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = job

  const card = (
    <>
      <Link to={`/jobs/${id}`} className="job-link-id">
        <li className="job-card-cont">
          <div className="logo-title-rating-cont">
            <img src={companyLogoUrl} alt="company logo" className="logo" />
            <div className="job-title-rating-cont">
              <h1 className="job-title">{title}</h1>
              <div className="ratings-cont">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-cont">
            <div className="job-location">
              <div className="icons-cont">
                <BiMap className="icon" />
                <p className="location">{location}</p>
                <BsFillBriefcaseFill className="icon" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr size="3" className="hr-line" />
          <div className="description-cont">
            <h1 className="job-description-title">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
  return card
}

export default JobCard
