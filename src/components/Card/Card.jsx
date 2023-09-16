import'./card.css'
import {CiLocationOn} from 'react-icons/ci'
import {NavLink} from'react-router-dom'


const Card = ({job}) => {
  return (
    <div className='job_card'>
        <header>
            <h5>{job.MatchedObjectDescriptor.PositionTitle} - <span>{job.MatchedObjectDescriptor.OrganizationName}</span></h5>
            <p><CiLocationOn/> {job.MatchedObjectDescriptor.PositionLocationDisplay}</p>
        </header>
        <div className='job_content'>
            <p>Total Openings: {job.MatchedObjectDescriptor.UserArea.Details.TotalOpenings ? job.MatchedObjectDescriptor.UserArea.Details.TotalOpenings : "Not mentioned"}</p>
            <p className='salary_tag'>Salary: 
                ${job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange} - 
                ${job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange} {job.MatchedObjectDescriptor.PositionRemuneration[0].Description}</p>
        </div>
        <footer>
            <a className='apply_btn' href={job.MatchedObjectDescriptor.ApplyURI} target='blank'>Apply Here</a>
            <NavLink className='apply_btn' to={`/job_details/${job.MatchedObjectId}`}>View Details</NavLink>
        </footer>
    </div>
  )
}

export default Card