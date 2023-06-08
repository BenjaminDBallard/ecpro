import { useParams } from 'react-router-dom'
import tests from '../test.json'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

export default function Job() {

    const params = useParams()
    const client = params.client_id
    const jobID = params.job_id
    const job = tests[client].jobs.find((j) => j.job_id === Number(jobID))

    return(
        <Box sx={{padding: '10px', backgroundColor: '#ffffff', margin: '60px 60px', borderRadius: '5px'}}>
            <Typography>Job ID: {job.job_id}</Typography>
            <Typography>Address: {job.address}</Typography>
            <Box>
                <Typography>Materials:</Typography>
                {job.materials.map((item, idx) => (
                        <Box key={idx} sx={{display: 'flex'}}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.brand}</Typography>
                            <Typography>{item.item_id}</Typography>
                            <Typography>{item.quantity}</Typography>
                        </Box>
                    ))}
                <IconButton color="success"><AddCircle fontSize='small'/></IconButton>
                <Typography>Labor:</Typography>
                <IconButton color="success"><AddCircle fontSize='small'/></IconButton>
            </Box>
            
        </Box>
        
    )
}