
import { Container, Box } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";
import construction from '../assets/construction.jpeg'
import placeholder from '../assets/placeholder.png'


export default function Root() {

    const { loginWithRedirect } = useAuth0();

    return(
        <div>
            <Container
            disableGutters
            maxWidth={false}
            sx={{
                backgroundImage: `url(${construction})`,
                backgroundSize: 'cover',
                backgroundPosition: '0 -300px'
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
                            // backgroundColor: 'blue',
                            width: '500px',
                            padding: '100px',
                        }}>
                        <Typography variant='h4'>The Electrical Takeoff & Estimating software you’ve been looking for!</Typography>
                        <Typography>Looking for a way to give your electrical business a jolt? With simple electrical estimating and bidding tools in ECpro, you can get item totals in seconds, and you can easily convert takeoffs to detailed estimates.</Typography>
                        <Box p='20px'>
                        <Button onClick={() => loginWithRedirect()} variant='contained'>Sign up</Button>
                        <Button onClick={() => loginWithRedirect()} variant='outlined' sx={{ml: 2}}>Login</Button>
                        </Box>

                        
                        
                    </Box>
                </Box>
            </Container>
            <Container>
                <Box>
                        <img
                            className='demo-img'
                            src={placeholder}
                            srcSet={placeholder}
                            alt="placeholder"
                        />
                </Box>
        
            
            </Container>
        </div>
    )
}