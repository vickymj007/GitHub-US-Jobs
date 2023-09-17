import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Main from "./components/Main/Main";
import JobDetails from "./components/JobDetails/JobDetails";
import Navbar from "./components/Navbar/Navbar";
import  { Toaster } from 'react-hot-toast';
import Login from "./components/Auth/Login";
import Resume from "./components/Resume/Resume";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Navbar/>}>
    <Route index element={<Main/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/job_details/:job_id" element={<JobDetails/>}/>
    <Route path="/resume-preview" element={<Resume/>}/>
  </Route>
))

function App() {

  return (
    <div className="App">
      <RouterProvider router={router}/>
      <Toaster/>
    </div>
  );
}

export default App;
