
import { Container, Box } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";
import construction from '../assets/construction.jpeg'
import placeholder from '../assets/placeholder.png'
import CalculateIcon from '@mui/icons-material/Calculate';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DescriptionIcon from '@mui/icons-material/Description';


export default function Root(props) {
    console.log(props.data)

    const { loginWithRedirect } = useAuth0();

    return(
        <Box>
            <Container
            disableGutters
            maxWidth={false}
            sx={{
                backgroundImage: `url(${construction})`,
                backgroundSize: 'cover',
                backgroundPosition: '0 -300px',
                backgroundRepeat: 'no-repeat'
            }}>
                <Box
                    
                    sx={{
                        width: '100%',
                        backgroundImage: 'linear-gradient(to right, #222222, #222222ab)',
                        color:'#ffffff',
                        height: 500,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            width: '550px',
                            padding: '120px',
                        }}>
                        <Typography variant='h4'>The Electrical Estimating software you’ve been looking for!</Typography>
                        <Typography>With simple electrical estimating and bidding tools in ECpro, you can get item prices in seconds, and you can easily convert material and labor totals to detailed estimates.</Typography>
                        <Box p='20px'>
                        <Button color="success" onClick={() => loginWithRedirect()} variant='outlined'>Sign up</Button>
                        <Button color="success" onClick={() => loginWithRedirect()} variant='contained' sx={{ml: 2}}>Login</Button>
                        </Box>

                        
                        
                    </Box>
                </Box>
            </Container>
            <Container maxWidth={false} sx={{display: 'flex', position: 'relative', bottom: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', bottom: '-150px', padding: '0 80px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <CalculateIcon sx={{ fontSize: 90, color:'#d9000093'}}/>
                        <Box>
                            <Typography variant='h6'>Detailed Cost Estimates & Proposals</Typography>
                            <Typography sx={{color: '#5c5c5c'}}>Adjust costs, markup, tax, and overhead. Create customized estimates and branded proposals quickly and easily.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <FolderCopyIcon sx={{ fontSize: 90, color:'#D9000093' }}/>
                        <Box>
                            <Typography variant='h6'>Plan, Spec and Document Management</Typography>
                            <Typography sx={{color: '#5c5c5c'}}>Nail every detail. Keep your docs organized and your project laser-focused.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <DescriptionIcon sx={{ fontSize: 90, color:'#D9000093' }}/>
                        <Box>
                            <Typography variant='h6' >Project Progression Managment</Typography>
                            <Typography sx={{color: '#5c5c5c'}}>keep track of project status with easy to see markups. know what needs to be done at a glance</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{}}>
                        <img
                            className='demo-img'
                            src={placeholder}
                            srcSet={placeholder}
                            alt="placeholder"
                        />
                </Box>
            
            </Container>
        </Box>
    )
}