import { Routes, Route, Outlet } from "react-router-dom";
import Root from './components/root'
import Dashboard from './components/Dashboard'
import ClientIndex from './components/ClientIndex'
import Job from './components/Job'
import Profile from './components/Profile'
import NavigationBar from './components/NavigationBar'
import { useEffect, useState } from "react";

export default function App() {

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
      fetch("/user").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])

    console.log(backendData)

    return (
        <>
            {(typeof backendData.user === 'undefined') ? (
                <p>Loading...</p>
            ) : (
            <div>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Root data = {backendData}/>} />
                    <Route path="/dashboard" element={<Dashboard data = {backendData}/>} />
                    <Route path="/profile" element={<Profile data = {backendData}/>} />
                    <Route path="/client" element={<Outlet />} >
                        <Route path=":client_id" element={<ClientIndex data = {backendData}/>} />
                    </Route>
                    <Route path="/client/:client_id/:job_id"  element={<Job data = {backendData}/>} />
                </Routes>
            </div> 
            )}
        </>       
    )
}
