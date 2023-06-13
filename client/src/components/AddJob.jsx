import { Fragment, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

const AddClient = (props) => {
    console.log(props)
    const [formState, setFormState] = useState({
        open: false,
        name: '',
        address: '',
        status: '',
        industry: ''
    })

    const toggleDialog = () => setFormState({ open: !formState.open })

    const handleTextChange = (e, valueType) => {
        let value = valueType === "number" ? parseInt(e.target.value) : e.target.value
        const newState = { ...formState }
        
        newState[e.target.id] = value
        setFormState(newState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = { ...formState }
        console.log(props.client_id)
        payload.client_id = props.client_id
        console.log('!!!!!!!!!!!!!!!!!!!!')
        console.log(JSON.stringify(payload))
        delete payload.open
        setFormState({ open: false })
        const response = await fetch("/jobs", {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(payload)
        })
        const prevState = props.triggerReRender + 1
        props.setTriggerReRender(prevState)
    }

        return (
            <Fragment>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color='success'
                        onClick={toggleDialog}
                    >
                        Add Job
                    </Button>
                </div>
                <div>
                    <Dialog open={formState.open} onClose={toggleDialog} >
                        <DialogTitle>Add Job</DialogTitle>
                        <DialogContent>
                            <form 
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '350px', rowGap: "20px" }}>
                                <TextField 
                                    id="name" 
                                    placeholder="Name" 
                                    value={formState.name} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="address" 
                                    placeholder="Address" 
                                    value={formState.address} 
                                    onChange={ (e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="status" 
                                    placeholder="Status" 
                                    value={formState.status} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="industry" 
                                    placeholder="Industry" 
                                    value={formState.industry} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <br />
                                <Button variant="contained" color="success" type="submit">Submit</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </Fragment>
        )
}

export default AddClient