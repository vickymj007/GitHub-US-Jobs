import './jobDetails.css'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const JobDetails = () => {
    const {job_id} = useParams()

    const {data} = useSelector(state => state.jobs)

    const currentJob = data.SearchResult.SearchResultItems.filter(job => job.MatchedObjectId === job_id)

  return (
    <div className='job_details_page'>
        {currentJob ?
            <div>
                <header>
                    <h5>{currentJob[0].MatchedObjectDescriptor.PositionTitle}</h5>
                    <NavLink to='/'>Go back</NavLink>
                </header>
                <main>
                    <p className='salary_tag'>Salary: ${currentJob[0].MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange} - 
                    ${currentJob[0].MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange} {currentJob[0].MatchedObjectDescriptor.PositionRemuneration[0].Description}</p>
                    <p>Posted Date: <span>{currentJob[0].MatchedObjectDescriptor.PublicationStartDate.slice(0,10)}</span></p>
                    <p>Organisation Name: <span>{currentJob[0].MatchedObjectDescriptor.OrganizationName}</span></p>
                    <p>Location: <span>{currentJob[0].MatchedObjectDescriptor.PositionLocationDisplay}</span></p>
                    <p>Requirements: <span>{currentJob[0].MatchedObjectDescriptor.UserArea.Details.Requirements}</span></p>
                    <p>Job Summary: <span>{currentJob[0].MatchedObjectDescriptor.UserArea.Details.JobSummary}</span></p>
                    <p>Benefits: <span>{currentJob[0].MatchedObjectDescriptor.UserArea.Details.Benefits ? currentJob[0].MatchedObjectDescriptor.UserArea.Details.Benefits : "Not Mentioned"}</span></p>
                    <p>How to Apply: <span>{currentJob[0].MatchedObjectDescriptor.UserArea.Details.HowToApply}</span></p>
                    <p></p>
                </main>
                <footer>
                    <button onClick={()=>toast.success("Applied 👍")}>Apply</button>
                </footer>
            </div>
            :
            <div>No Jobs Found...</div>
        }
    </div>
  )
}

export default JobDetails