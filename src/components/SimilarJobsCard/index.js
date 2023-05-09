import {BiMap} from 'react-icons/bi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobsCard = props => {
  const {similar} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similar
  const similarCard = (
    <li className="similar-list">
      <div className="similar-top-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div className="similar-rating-head-cont">
          <h1 className="similar-head">{title}</h1>
          <div className="similar-rating-star-cont">
            <AiFillStar className="star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-des-head">Description</h1>
      <p className="similar-description">{jobDescription}</p>
      <div className="similar-bottom-icon-cont">
        <BiMap className="similar-icon" />
        <p className="similar-location">{location}</p>
        <BsFillBriefcaseFill className="similar-icon" />
        <p className="similar-emp-type">{employmentType}</p>
      </div>
    </li>
  )
  return similarCard
}

export default SimilarJobsCard
