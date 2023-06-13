import { Box, Button, Card, Container,  Typography } from "@mui/material";
import { useParams } from "react-router"
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useContext} from "react";
// import { DataContext } from "../App";
import { useState, useEffect } from "react";
import { fetchDashboardData } from "../api/fetch-data";
import AddJob from './AddJob'

export default function ClientIndex() {

    // const {clientsData, setClientsData, jobsData, setJobsData} = useContext(DataContext)
    const [clientsData, setClientsData] = useState({})
    const [jobsData, setJobsData] = useState({})
    const [triggerReRender, setTriggerReRender] = useState(1)

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
        
    }, [setClientsData, setJobsData, triggerReRender])
    
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
            <Container sx={{margin: '200px auto', textAlign: 'center'}}>
                <Typography variant="h4">Loading...</Typography>
            </Container>
        ) : (
            <Box maxWidth='lg' sx={{display: 'flex', flexDirection: 'column', gap: '5px', margin: '60px auto'}}>
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
                        <Box sx={{display: 'flex', gap: '20px',justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '10px'}}>
                            {clientsJobs.map((job, index) => (
                                <Card key={index} sx={{backgroundColor: '#F1F1F1', width: '300px', padding: '10px'}}>
                                    <Typography>{job.name.toUpperCase()}</Typography>
                                    <Typography>{job.address}</Typography>
                                    <Link to={`${job.id}`}><Button variant="contained" size="small" color="success" sx={{marginTop: '8px'}}>View Job</Button></Link>
                                </Card>
                            ))}
                            
                            
                        </Box>
                        <AddJob client_id={clientID} triggerReRender={triggerReRender} setTriggerReRender={setTriggerReRender}/>
                    </Box>
                    <Outlet />
                </Box>
                
                
            </Box>
        )}
        </>
    )
}