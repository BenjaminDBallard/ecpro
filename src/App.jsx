import { Routes, Route, Outlet } from "react-router-dom";
import Root from './components/root'
import Dashboard from './components/Dashboard'
import ClientIndex from './components/ClientIndex'
import Job from './components/Job'
import Profile from './components/Profile'
import NavigationBar from './components/NavigationBar'
// import ErrorPage from './error-page'

export default function App() {
    return (
        <>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/client" element={<Outlet />} >
                    <Route path=":client_id" element={<ClientIndex />} >
                        <Route path=":job_id" element={<Job />} />
                    </Route>
                </Route>
            </Routes>  
        </>       
    )
}
