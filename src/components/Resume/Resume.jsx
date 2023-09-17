import React from 'react'
import { useSelector } from 'react-redux'
import {AiOutlineFile} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import './resume.css'

const Resume = () => {
    const navigate = useNavigate()
    const {resumeData} = useSelector(state => state.user)

  return (
    <div className='resume-preview'>
        <h3>Preview your resume</h3>
        <div className='resume-paper'>
            <h2>{resumeData.name}</h2>
            <p className='email'>{resumeData.email}</p>
            <hr />
            <label>Cover note : </label>
            <p className='cover'>{resumeData.cover_note}</p>
            <label>Resume : </label>
            <div>
                <AiOutlineFile/>
                <span>{resumeData.file}</span>
            </div>
            <label>Declaration :</label>
            <p>I hereby declare that the facts given above are genuine to the best of my knowledge and belief. All the information mentioned above in the resume is correct to the best of my knowledge and belief. All the details mentioned above are true and correct to the best of my knowledge and beliefs.</p>
        </div>
        <button onClick={()=>navigate('/')}>Go back</button>
    </div>
  )
}

export default Resume