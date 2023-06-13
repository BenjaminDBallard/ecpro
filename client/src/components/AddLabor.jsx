import { Fragment, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

const AddLabor = (props) => {
    const [formState, setFormState] = useState({
        open: false,
        job_title: '',
        pay_scale: 0,
        quantity: 0,
        hours: 0,
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
        payload.job_id = props.job_id
        console.log(JSON.stringify(payload))
        delete payload.open
        setFormState({ open: false })
        const response = await fetch("/labor", {
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
                        Add Labor
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
                                    id="job_title" 
                                    placeholder="Job Title" 
                                    value={formState.job_title} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="pay_scale" 
                                    placeholder="Pay Scale" 
                                    value={formState.pay_scale} 
                                    onChange={ (e) => handleTextChange(e, "integer")} 
                                    required />
                                <TextField 
                                    id="quantity" 
                                    placeholder="Quantity" 
                                    value={formState.quantity} 
                                    onChange={(e) => handleTextChange(e, "integer")} 
                                    required />
                                <TextField 
                                    id="hours" 
                                    placeholder="Hours" 
                                    value={formState.hours} 
                                    onChange={(e) => handleTextChange(e, "integer")} 
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

export default AddLabor