import React, { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './modal.css'
import {BsUpload} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setResumeData } from '../../redux/userSlice'
import toast from 'react-hot-toast'




export const Modal = ({openModal, setOpenModal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error,setError] = useState("")

    const modalRef = useRef(null)

    const {data} = useSelector(state => state.user)

    const initialState = {
        name:data.displayName,
        email:data.email,
        cover_note:"",
        file:""
    }

    const [resumeInfo, setResumeInfo] = useState(initialState) 

    const handleInputChange = (e)=>{
        setResumeInfo({...resumeInfo,[e.target.name]:e.target.value})
    }

    const handleFileChange = (e)=>{
        setError("")
        setResumeInfo({...resumeInfo,[e.target.name]:e.target.files[0].name})
    }

    const handleSubmit = (e)=>{
        if(!resumeInfo.file || !resumeInfo.name || !resumeInfo.email || !resumeInfo.cover_note){
            return setError("Please fill in all the fields")
        }
        dispatch(setResumeData(resumeInfo))
        setOpenModal(false)
        toast.success("Successfully applied for the Job👍")
        navigate('/resume-preview')
    }


  return (
    <div className={openModal ? "modal open" : "modal"}>
        <AiFillCloseCircle onClick={()=>setOpenModal(false)}/>
        <dialog ref={modalRef}>
            <h2>Please fill the form</h2>
            <input 
                type="text" 
                placeholder='Name'
                value={resumeInfo.name}
                name='name'
                onChange={handleInputChange}
            />
            <input 
                type="email" 
                placeholder='Email'
                value={resumeInfo.email}
                name='email'
                onChange={handleInputChange}
            />
            <textarea 
                rows='10' 
                placeholder='Tell us why we should hire you...'
                name='cover_note'
                onChange={handleInputChange}
            />
            <label htmlFor="resume">Upload Resume <BsUpload/></label>
            <input 
                type="file" 
                hidden id='resume'
                name='file'
                accept="image/png, image/jpeg, application/pdf"
                onChange={handleFileChange}
            />
            {resumeInfo.file && <p>{resumeInfo.file}</p>}
            {/* Handle Errors */}
            {error && <p className='error'>{error}</p>}
            <button onClick={handleSubmit}>Submit</button>
        </dialog>
    </div>
  )
}
