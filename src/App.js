import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Main from "./components/Main/Main";
import JobDetails from "./components/JobDetails/JobDetails";
import Navbar from "./components/Navbar/Navbar";
import  { Toaster } from 'react-hot-toast';
import Login from "./components/Auth/Login";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Navbar/>}>
    <Route index element={<Main/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/job_details/:job_id" element={<JobDetails/>}/>
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
