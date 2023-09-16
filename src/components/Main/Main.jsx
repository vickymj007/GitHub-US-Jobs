import { useState } from 'react'
import './main.css'
import axios from 'axios'
import {useDispatch ,useSelector} from 'react-redux'
import { setData } from '../../redux/jobSlice'
import Card from '../Card/Card'
import toast from 'react-hot-toast'

axios.defaults.withCredentials = false

const Main = () => {
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.jobs)

  const [inputValue, setInputValue]=useState("")
  const [loader,setLoader] = useState(false)

  const handleClick = async (e)=>{
    e.preventDefault()
    setLoader(true)
    dispatch(setData(null))
    try {
      const response = await axios.get(`https://data.usajobs.gov/api/search?Keyword=${inputValue}`,{
        headers:{
          'Authorization-Key':process.env.REACT_APP_USJOBS_APIKEY
      }
      })
      dispatch(setData(response.data))
      setLoader(false)
    } catch (error) {
      toast.error(error.response.data)
      setLoader(false)
    }
  }

  return (
    <div>
        {/* Search Bar */}
        <form className='search_bar' onSubmit={handleClick}>
          <label htmlFor="search_input">Enter your preferred programming language</label>
          <input
            type="text"
            id='search_input' 
            placeholder='e.g. Python, Java, PHP'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
          />
          <button>Search Jobs</button>
        </form>
        {loader && <div className="loader"></div>}
        {data &&
          <div className='job_section'>
            <p>Your Search returned {data.SearchResult.SearchResultCount} Jobs</p>
            <div className="jobs_container">
              {data.SearchResult.SearchResultCount === 0 ? null :
              data.SearchResult.SearchResultItems.map(job=>(
                <Card key={job.MatchedObjectId} job={job}/>
              ))}
            </div>
          </div>
        }
    </div>
  )
}

export default Main