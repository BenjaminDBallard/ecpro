import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router"
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
// import { useContext} from "react";
// import { DataContext } from "../App";
import { useState, useEffect } from "react";
import { fetchDashboardData } from "../api/fetch-data";

export default function ClientIndex() {

    // const {clientsData, setClientsData, jobsData, setJobsData} = useContext(DataContext)
    const [clientsData, setClientsData] = useState({})
    const [jobsData, setJobsData] = useState({})

    useEffect(() => {
        (
            async () => {
                const {clientResponse, jobsResponse} = await fetchDashboardData()
                if (clientResponse.clients?.length > 0) {
                    setClientsData(clientResponse)
                    console.log(clientResponse)
                }

                if (jobsResponse.jobs?.length > 0) {
                    setJobsData(jobsResponse)
                }
            } 
        )()
        
    }, [setClientsData, setJobsData])
    
    const params = useParams();
    const clientID = Number(params.client_id) + 1

    let client = {}
    const clientsJobs = [] 

    clientsData.clients?.forEach((currentClient) => {
        if (currentClient.id === clientID) {
            client = currentClient
        }
    })

    jobsData.jobs?.forEach((job) => {
        if (job.client_id === clientID) {
            clientsJobs.push(job)
        }
    })
    

    return(
        <>
        {(typeof client.id === 'undefined') ? (
            <Typography>Loading...</Typography>
        ) : (
            <Box maxWidth='xl' sx={{margin: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box maxWidth='lg' sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <Box sx={{display: 'flex', justifyContent:'space-between', padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
                        <Box>
                            <Typography variant="h6">Company: {client.company.toUpperCase()}</Typography>
                            <Typography>Job ID: {client.id}</Typography>
                        </Box>
                        <Box>
                            <Typography>Contact: {client.first_name} {client.last_name}</Typography>
                            <Typography>Phone: {client.phone}</Typography>
                            <Typography>Email: {client.email}</Typography>
                        </Box>
                    </Box>
                    <Box maxWidth='xl' sx={{padding: '10px', backgroundColor: '#fff',  borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
                        <Typography variant="h6">Jobs</Typography>
                        <Box sx={{display: 'flex', gap: '20px',justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px'}}>
                            {clientsJobs.map((job, index) => (
                                <Card key={index} sx={{backgroundColor: '#F1F1F1', width: '300px', padding: '10px'}}>
                                    <Typography>{job.name.toUpperCase()}</Typography>
                                    <Typography>{job.address}</Typography>
                                    <Link to={`${job.id}`}><Button variant="contained" size="small" color="success" sx={{marginTop: '8px'}}>View Job</Button></Link>
                                </Card>
                            ))}
                            <Card sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#47744752', width: '300px', height: '78.75px', padding: '10px'}}>
                                <IconButton color="success" sx={{height: '51px'}}><AddCircle fontSize='large'/></IconButton>
                            </Card>
                            
                        </Box>
                    </Box>
                    <Outlet />
                </Box>
                
                
            </Box>
        )}
        </>
    )
}