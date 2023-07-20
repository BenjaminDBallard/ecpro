import { useParams } from 'react-router-dom'
// import tests from '../test.json'
import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
// import { DataContext } from "../App";
import { fetchJobsData } from '../../api/fetch-data';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart'
import AddLabor from '../sub-components/job-comps/AddLabor'
import SearchAddMaterial from '../sub-components/job-comps/SearchAddMaterial';

export default function Job() {

    // const {jobsData, setJobsData} = useContext(DataContext)
    const [jobsData, setJobsData] = useState({})
    const [materialsData, setMaterialsData] = useState({})
    const [laborData, setLaborData] = useState({})
    const [triggerReRender, setTriggerReRender] = useState(1)

    useEffect(() => {
        (
            async () => {
                const {jobsResponse, materialsResponse, laborResponse} = await fetchJobsData()
                if (jobsResponse.jobs?.length > 0) {
                    setJobsData(jobsResponse)
                }

                if (materialsResponse.materials?.length > 0) {
                    setMaterialsData(materialsResponse)
                }

                if (laborResponse.labor?.length > 0) {
                    setLaborData(laborResponse)
                }
            } 
        )()
        
    }, [setJobsData, setMaterialsData, setLaborData, triggerReRender])

    const params = useParams()
    const clientID = Number(params.client_id) + 1
    const jobID = Number(params.job_id)

    let job = {}
    let jobsMaterials = []
    let jobsLabor = []

    let materialPrices = [0, 0]
    let materialTotal = 0
    let materialMarkupTotal = 0

    let laborPrices = [0, 0]
    let laborTotal = 0
    let laborMarkupTotal = 0

    const defaultMarkup = .3


    jobsData.jobs?.forEach((currentJob) => {
        if ((currentJob.id === jobID)&&(currentJob.client_id === clientID)) {
            job = currentJob
        }
    })

    materialsData.materials?.forEach((material) => {
        if (material.job_id === jobID) {
            jobsMaterials.push(material)
            materialPrices.push(material.price * material.quantity)
        }
        materialTotal = materialPrices.reduce((a, b) => a + b)
        materialMarkupTotal = materialTotal * defaultMarkup
    })

    laborData.labor?.forEach((emp) => {
        if (emp.job_id === jobID) {
            jobsLabor.push(emp)
            laborPrices.push(emp.pay_scale * emp.quantity * emp.hours)
        }
        laborTotal = laborPrices.reduce((a, b) => a + b)
        laborMarkupTotal = laborTotal * defaultMarkup
    })


 
    return(
        <>
        {(typeof job.id === 'undefined') ? (
            <Container sx={{margin: '200px auto', textAlign: 'center'}}>
                <Typography variant="h4">Loading...</Typography>
            </Container>
        ) : (
        <Box maxWidth='lg' sx={{display: 'flex', flexDirection: 'column', gap: '5px', margin: '60px auto'}}>
        <Box sx={{display: 'flex', justifyContent:'space-between', padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
            <Box>
                <Typography variant='h6'>{job.name.toUpperCase()}</Typography>
                <Typography>Job ID: {job.id}</Typography>
                <Typography>Address: {job.address}</Typography>
            </Box>
            <Box>
                <Typography>Status: {job.status}</Typography>
                <Typography>Industry: {job.industry}</Typography>
            </Box>
            
        </Box>
        <Box sx={{display: 'flex', gap: '5px'}}>
            <Box minWidth='400px' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', border: '1px #cacaca solid', backgroundColor: '#ffffff', filter: 'drop-shadow(3px 2px 4px #00000053)', borderRadius: '5px', width: '30%'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '350px'}}>
                    <Box>
                        <Typography variant='h6'>Selling Price</Typography>
                    </Box>
                    <Box sx={{textAlign: 'right'}}>
                        <Typography variant='h4'>{materialTotal + materialMarkupTotal + laborTotal + laborMarkupTotal}</Typography>
                        <Typography>USD</Typography>
                    </Box>
                </Box>
                <Box></Box>
                <PieChart
                style={{ width: '300px', filter: 'drop-shadow(5px 4px 4px #00000088)' }}
                data={[
                    { title: materialTotal, value: materialTotal, color: '#e38527' },
                    { title: 'Material Mark-up', value: materialMarkupTotal, color: '#01c923' },
                    { title: 'Labor Mark-up', value: laborMarkupTotal, color: '#007018' },
                    { title: laborTotal, value: laborTotal, color: '#c11537' },
                ]}
                labelPosition={50}
                lengthAngle={360}
                lineWidth={45}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                viewBoxSize={[100, 100]}
                />
                <h6>
                    <span style={{background: '#e38527'}}>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </span>
                    &nbsp;
                    <span>Material</span>
                    &nbsp;
                    &nbsp;
                    <span style={{background: '#01c923'}}>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </span>
                    &nbsp;
                    <span>Material Mark-up</span>
                    &nbsp;
                    &nbsp;
                    <span style={{background: '#c11537'}}>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </span>
                    &nbsp;
                    <span>Labor</span>
                    &nbsp;
                    &nbsp;
                    <span style={{background: '#007018'}}>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </span>
                    &nbsp;
                    <span>Labor Mark-up</span>
                </h6>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', padding: '20px',gap: '20px' , backgroundColor: '#ffffff', borderRadius: '5px', width: '70%', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
                <Box>
                    <Typography variant='h6'>Project Mark-ups</Typography>
                </Box>
                <Container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Expected Cost</TableCell>
                                <TableCell>Shop Mark-up</TableCell>
                                <TableCell>Total Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Material</TableCell>
                                <TableCell>{Math.floor(materialTotal)}</TableCell>
                                <TableCell>{Math.floor(materialMarkupTotal)}</TableCell>
                                <TableCell>{materialTotal + materialMarkupTotal}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Labor</TableCell>
                                <TableCell>{Math.floor(laborTotal)}</TableCell>
                                <TableCell>{Math.floor(laborMarkupTotal)}</TableCell>
                                <TableCell>{laborTotal + laborMarkupTotal}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{Math.floor(laborTotal + materialTotal)}</TableCell>
                                <TableCell>{Math.floor(laborMarkupTotal + materialMarkupTotal)}</TableCell>
                                <TableCell>{laborTotal + laborMarkupTotal + materialTotal + materialMarkupTotal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
            
            </Box>
        </Box>
        <Box sx={{padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', border: '1px #cacaca solid', filter: 'drop-shadow(3px 2px 4px #00000053)'}}>
            
            <Box sx={{padding: '20px'}}>
            <Typography variant='h6'>Unit Price</Typography>
                
                        <Container maxWidth="lg" sx={{marginBottom: '10px'}}>
                        <Table>
                            <TableHead>
                            <Typography>Materials</Typography>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>UPC</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {jobsMaterials.map((item, idx) => {
                            
                            return(
                                <TableRow key={idx}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.product_id}</TableCell>
                                    <TableCell>{item.upc}</TableCell>
                                    <TableCell>{item.brand}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell>
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            )})}
                            </TableBody>
                        </Table>
                    </Container>
                    <SearchAddMaterial job_id={jobID} triggerReRender={triggerReRender} setTriggerReRender={setTriggerReRender}/>
                
                    <Container maxWidth="lg" sx={{marginBottom: '10px'}}>
                            <Table>
                                <TableHead>
                                <Typography>Labor</Typography>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Job Title</TableCell>
                                        <TableCell>Pay Scale</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Hours</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {jobsLabor.map((emp, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{emp.id}</TableCell>
                                    <TableCell>{emp.job_title}</TableCell>
                                    <TableCell>{emp.pay_scale}</TableCell>
                                    <TableCell>{emp.quantity}</TableCell>
                                    <TableCell>{emp.hours}</TableCell>
                                    <TableCell>{emp.pay_scale * emp.quantity * emp.hours}</TableCell>
                                    <TableCell>
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Container>
                <AddLabor job_id={jobID} triggerReRender={triggerReRender} setTriggerReRender={setTriggerReRender}/>
            </Box>
            
        </Box>
        
        </Box>
        )}</>
    )
}