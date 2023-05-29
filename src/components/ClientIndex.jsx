import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router"
import { Outlet } from "react-router-dom";
import tests from '../test.json'
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";

export default function ClientIndex() {
    const params = useParams();
    const client = params.client_id

    return(
        <Box sx={{marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{ backgroundColor: '#fff',}}>
                <Box maxWidth='xl' sx={{display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#f1f1f1f1'}}>
                    <Typography>{tests[client].client}</Typography>
                    <Typography>Client ID: {params.client_id}</Typography>
                </Box>
                <Box maxWidth='xl' sx={{padding: '10px',}}>
                    <Typography>Jobs:</Typography>
                    <Box sx={{display: 'flex', gap: '20px',justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px'}}>
                        {tests[client].jobs.map((job, index) => (
                            <Card key={index} sx={{backgroundColor: '#F1F1F1', width: '300px', padding: '10px'}}>
                                <Typography>{job.address}</Typography>
                                <Typography>Job ID: {job.job_id}</Typography>
                                <Link to={`${job.job_id}`}><Button variant="contained" size="small" color="success">View</Button></Link>
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
        
    )
}