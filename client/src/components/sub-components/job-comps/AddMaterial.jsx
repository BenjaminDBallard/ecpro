import { Fragment, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

const AddMaterial = (props) => {
    const [formState, setFormState] = useState({
        open: false,
        name: '',
        product_id: 0,
        upc: 0,
        brand: '',
        price: 0,
        description: '',
        quantity: 0 
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
        const response = await fetch("/materials", {
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
                        Add Material
                    </Button>
                </div>
                <div>
                    <Dialog open={formState.open} onClose={toggleDialog} >
                        <DialogTitle>Add Material</DialogTitle>
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
                                    id="product_id" 
                                    placeholder="Product ID" 
                                    value={formState.product_id} 
                                    onChange={ (e) => handleTextChange(e, "integer")} 
                                    required />
                                <TextField 
                                    id="upc" 
                                    placeholder="UPC" 
                                    value={formState.upc} 
                                    onChange={(e) => handleTextChange(e, "integer")} 
                                    required />
                                <TextField 
                                    id="brand" 
                                    placeholder="Brand" 
                                    value={formState.brand} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="price" 
                                    placeholder="Price" 
                                    value={formState.price} 
                                    onChange={(e) => handleTextChange(e, "integer")} 
                                    required />
                                <TextField 
                                    id="description" 
                                    placeholder="Description" 
                                    value={formState.description} 
                                    onChange={(e) => handleTextChange(e, "string")} 
                                    required />
                                <TextField 
                                    id="quantity" 
                                    placeholder="Quantity" 
                                    value={formState.quantity} 
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

export default AddMaterial