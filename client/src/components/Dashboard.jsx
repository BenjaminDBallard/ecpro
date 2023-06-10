import { Box, Button, IconButton } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
// import clients from '../../../server/test.json'
// import test from '../../../client/public/test.json'

export default function Dashboard(props) {

    const clients = props.data.clients
    

    return(
        <Box maxWidth='xl' sx={{margin: '60px auto'}}>
            <Box sx={{ display: 'flex' , alignItems: 'center', gap: '5px',  margin: '6px 60px', borderRadius: '5px'}}>
                <Typography fontSize={'20px'}>Dashboard</Typography>
            </Box>
            <Box sx={{ display: 'flex' , alignItems: 'center', gap: '5px', margin: '6px 60px', borderRadius: '5px'}}>

                <Typography>Client List:</Typography>
            </Box>
            <Box sx={{margin: '6px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {clients.map((client, idx) => (
                    <Accordion key={idx} sx={{width: '100%'}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{display: 'flex', justifyContent: 'space-between'}}
                        >
                            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <Typography>{client.client.toUpperCase()}</Typography>
                                <Typography sx={{marginRight: '20px'}}> Jobs: {client.jobs.length}</Typography>
                            </Box>
                            
                        
                                    
                        </AccordionSummary>
                        <AccordionDetails>
                            {client.jobs.map((job, index)=>(
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