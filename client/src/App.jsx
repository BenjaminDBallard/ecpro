import { createContext, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Root from './components/root'
import Dashboard from './components/Dashboard'
import ClientIndex from './components/ClientIndex'
import Job from './components/Job'
import Profile from './components/Profile'
import Account from './components/Account'
import NavigationBar from './components/NavigationBar'


export const DataContext = createContext()

export default function App() {

    const [clientsData, setClientsData] = useState([])
    const [jobsData, setJobsData] = useState([])
    

    

    return (
        <>

            <DataContext.Provider value={{clientsData, setClientsData, jobsData, setJobsData}}>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/client" element={<Outlet />} >
                        <Route path=":client_id" element={<ClientIndex />} />
                    </Route>
                    <Route path="/client/:client_id/:job_id"  element={<Job />} />
                </Routes>
            </DataContext.Provider> 
        </>       
    )
}
