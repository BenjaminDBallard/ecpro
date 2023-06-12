import { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

export default function AddClient() {
    let values = {
        open: false,
        name: '',
        mpg: '',
        cylinders: '',
        horsepower: '',
    }

    toggleDialog = () => this.setState({ open: !this.state.open })

    handleTextChange = (e) => {
        const newState = { ...this.state }
        newState[e.target.id] = e.target.value
        this.setState(newState)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const payload = { ...this.state }
        payload.id = this.props.carTotal + 1
        delete payload.open
        console.log("THE CAR", payload)
        this.props.addCar(payload)
        this.setState({ open: false })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.open !== this.state.open) {
            this.setState({
                name: '',
                mpg: '',
                cylinders: '',
                horsepower: ''
            })
        }
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    onClick={this.toggleDialog}
                    color='success'
                    size='small'
                >
                    New Client
                </Button>
            </div>
            <div>
                <Dialog open={this.state.open} onClose={this.toggleDialog} >
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogContent>
                        <form 
                            onSubmit={this.handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
                            <TextField 
                                id="firstname" 
                                placeholder="Firstname" 
                                value={this.state.first_name} 
                                onChange={this.handleTextChange} 
                                required />
                            <TextField 
                                id="lastname" 
                                placeholder="Lastname" 
                                value={this.state.last_name} 
                                onChange={this.handleTextChange} 
                                required />
                            <TextField 
                                id="company" 
                                placeholder="Company" 
                                value={this.state.company} 
                                onChange={this.handleTextChange} 
                                required />
                            <TextField 
                                id="phone" 
                                placeholder="Phone" 
                                value={this.state.phone} 
                                onChange={this.handleTextChange} 
                                required />
                            <TextField 
                                id="email" 
                                placeholder="Email" 
                                value={this.state.email} 
                                onChange={this.handleTextChange} 
                                required />
                            <br />
                            <Button variant="contained" color="success" size='small' type="submit">Submit</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}