import { Box, Button, IconButton } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PathBar from "./PathBar"
import tests from '../test.json'
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
    const { user } = useAuth0();

    return(
        <Box maxWidth='xl' sx={{margin: '60px auto'}}>
            <Typography sx={{margin: '0 60px'}}>WELCOME {user.nickname.toUpperCase()}!</Typography>
            <Box sx={{margin: '6px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {tests.map((test, idx) => (
                    <Accordion key={idx} sx={{width: '100%'}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Box sx={{display: 'flex', justifyContent: 'space-between',}}>
                                <Typography>{test.client.toUpperCase()}</Typography>
                            </Box>
                        
                        
                                    
                        </AccordionSummary>
                        <AccordionDetails>
                            {test.jobs.map((job, index)=>(
                                <Accordion key={index} sx={{backgroundColor: '#f1f1f1'}}> 
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>{job.address.toUpperCase()}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Typography>Job ID: {job.job_id}</Typography>
                                        <Link to={`/client/${idx}/${job.job_id}`}><Button variant="contained" color="success">View</Button></Link>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        <Link to={`/client/${idx}`}><Button sx={{margin: '15px 0 0'}} size="small" variant="contained" color="success">View</Button></Link>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <IconButton color="success" sx={{height: '51px'}}><AddCircle fontSize='large'/></IconButton>
            </Box>
        </Box>
)}