import { Box, Button } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
// import { AddCircle } from "@mui/icons-material";
import { useEffect, useState} from "react";
import { fetchDashboardData } from "../../api/fetch-data";
// import { DataContext } from "../App";
import AddClient from "../sub-components/dashboard-comps/AddClient";

export default function Dashboard() {
    // const {clientsData, setClientsData, jobsData, setJobsData} = useContext(DataContext)
    const [clientsData, setClientsData] = useState({})
    const [jobsData, setJobsData] = useState({})
    const [triggerReRender, setTriggerReRender] = useState(1)
    const userID = 1

    useEffect(() => {
        (
            async () => {
                const {clientResponse, jobsResponse} = await fetchDashboardData()
                if (clientResponse.clients?.length > 0) {
                    setClientsData(clientResponse)
                }

                if (jobsResponse.jobs?.length > 0) {
                    setJobsData(jobsResponse)
                }
            } 
        )()
        
    }, [setClientsData, setJobsData, triggerReRender])

    return(
        <>
        {(typeof clientsData === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            <Box maxWidth='lg' sx={{display: 'flex', flexDirection: 'column', gap: '5px', margin: '60px auto'}}>
            <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'left', padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
                <Typography fontSize={'20px'}>Dashboard</Typography>
                <Typography>Client List:</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'left', padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
            <Box  sx={{marginBottom: '10px'}}>
                {clientsData.clients?.map((client, idx) => {
                    const clientID = client.id
                    const clientsJobs = [] 

                    jobsData.jobs.forEach((job) => {
                        if (job.client_id === clientID) {
                            clientsJobs.push(job)
                        }
                    })

                    return ( 
                    
                        <Accordion key={idx}  sx={{width: '100%', backgroundColor: '#f4f4f4', }}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{display: 'flex', justifyContent: 'space-between'}}
                            >
                                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <Typography>{client.company.toUpperCase()}</Typography>
                                    <Typography sx={{marginRight: '20px'}}> Jobs: {clientsJobs.length}</Typography>
                                </Box>
                                
                            
                                        
                            </AccordionSummary>
                            <AccordionDetails>
                                {clientsJobs.map((job, index)=>(
                                    <Accordion key={index} sx={{backgroundColor: '#e6e6e6'}}> 
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography>{job.address.toUpperCase()}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Typography>Job ID: {job.id}</Typography>
                                            <Link to={`/client/${idx}/${job.id}`}><Button size='small' variant="contained" color="success">View Job</Button></Link>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            <Link to={`/client/${idx}`}><Button sx={{margin: '15px 0 0'}} size="small" variant="contained" color="success">View Client</Button></Link>
                            </AccordionDetails>
                        </Accordion>
                    
                )})}
                </Box>
                <AddClient  user_id={userID} triggerReRender={triggerReRender} setTriggerReRender={setTriggerReRender}/>
            </Box>
            
        </Box>
    )}
</>
)}