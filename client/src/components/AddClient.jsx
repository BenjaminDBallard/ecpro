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
        first_name: '',
        last_name: '',
        company: '',
        phone: '',
        email: ''
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
        console.log(props)
        payload.user_id = props.user_id
        console.log('!!!!!!!!!!!!!!!!!!!!')
        console.log(JSON.stringify(payload))
        delete payload.open
        setFormState({ open: false })
        const response = await fetch("/clients", {
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
                        Add Client
                    </Button>
                </div>
                <div>
                    <Dialog open={formState.open} onClose={toggleDialog} >
                        <DialogTitle>Add Labor</DialogTitle>
                        <DialogContent>
                            <form 
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '350px', rowGap: "20px" }}>
                                <TextField 
                                    id="first_name" 
                                    placeholder="First Name" 
                                    value={formState.first_name} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="last_name" 
                                    placeholder="Last Name" 
                                    value={formState.last_name} 
                                    onChange={ (e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="company" 
                                    placeholder="Company" 
                                    value={formState.company} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="phone" 
                                    placeholder="Phone" 
                                    value={formState.phone} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="email" 
                                    placeholder="Email" 
                                    value={formState.email} 
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