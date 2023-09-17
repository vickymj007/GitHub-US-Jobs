import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/userSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {data} = useSelector(state => state.user)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        return navigate('/login')
    }
    dispatch(setUser(user))

  },[navigate,dispatch])

  const handleClick = ()=>{
    dispatch(setUser(null))
    localStorage.removeItem('user')
    toast.success("Successfully signed out.")
    navigate('/login')
  }

  return (
    <div>
        <nav className='navbar'>
            <div className='navbar_wrapper'>
              <h2>GitHub US Jobs</h2>
              {data && <button onClick={handleClick}><span>{data?.displayName.slice(0,1)}</span> Sign out</button>}
            </div>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Navbar