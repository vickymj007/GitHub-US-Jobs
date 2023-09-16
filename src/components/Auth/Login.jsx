import { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUser } from '../../redux/userSlice'
import { auth, db } from '../../config/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUserWithEmailAndPassword } from 'firebase/auth'

axios.defaults.withCredentials = false


const Login = () => {

    const {data} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginView, setLoginView] = useState(true)
    const [error,setError] = useState("")
    const userCollection = collection(db,"users")

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [signUpEmail,setSignUpEmail] = useState("")
    const [signUpPass,setSignUpPass] = useState("")

    useEffect(()=>{
        if(data){
            navigate('/')
        }
    },[navigate,data])

    const handleClick = async (e)=>{
        e.preventDefault()
        if(loginView){
            try {
                if(!email || !password) return setError("Please fillin all the fields")
                const docRef = doc(db,"users", email)
                const user = await getDoc(docRef)
                if(!user.data()) return setError("Email not Registered")

                if(user.data().password !== password) return setError("Incorrect Password")
                
                localStorage.setItem("user",JSON.stringify(user.data()))
                dispatch(setUser(user.data()))
                toast.success(`Welcome back ${user.data().displayName}`)
                navigate("/")
            } catch (error) {
                setError(error.message)
            }
            
        }else{
            if(!signUpEmail || !signUpPass || !name) return setError("Please fill all the fields")
            try {
                await createUserWithEmailAndPassword(auth,signUpEmail,signUpPass)
                
                const newUser = {
                    displayName:name,
                    email:signUpEmail,
                    photoURL:"",
                    password:signUpPass
                }

                await setDoc(doc(userCollection,signUpEmail),newUser)
        
                localStorage.setItem("user",JSON.stringify(newUser))
                dispatch(setUser(newUser))
                toast.success(`Account created successfully`)
                navigate("/")
            } catch (error) {
                setError(error.message)
            }
        }
    }

  return (
    <div className='login_page'>
        <form onSubmit={handleClick}>
            {loginView ? 
                <>
                    <h2>Login</h2>
                    <input 
                        type="email" 
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Passwoord'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </>
                :
                <>
                    <h2>Signup</h2>
                    <input 
                        type="text" 
                        placeholder='Name'
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder='Email'
                        onChange={(e)=>setSignUpEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        onChange={(e)=>setSignUpPass(e.target.value)}
                    />
                </>
            }
            {error && <p className='error'>{error}</p>}
            <button type='submit'>{loginView ? "Login" : "Register"}</button>
            <p>{loginView ? "New User ?" : "Already have an account ?"} 
            <span onClick={()=>setLoginView(!loginView)}>{loginView ? " Register" : " Login"}</span></p>
        </form>
    </div>
  )
}

export default Login