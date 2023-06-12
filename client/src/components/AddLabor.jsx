import { Component, Fragment } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

class AddLabor extends Component {
    state = {
        open: false,
        job_title: '',
        pay_scale: '',
        quantity: '',
        hours: '',
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
                job_title: '',
                pay_scale: '',
                quantity: '',
                hours: '',
            })
        }
    }

    render() {
        return (
            <Fragment>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color='success'
                        onClick={this.toggleDialog}
                    >
                        Add Labor
                    </Button>
                </div>
                <div>
                    <Dialog open={this.state.open} onClose={this.toggleDialog} >
                        <DialogTitle>Add Labor</DialogTitle>
                        <DialogContent>
                            <form 
                                onSubmit={this.handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
                                <TextField 
                                    id="job_title" 
                                    placeholder="Job Title" 
                                    value={this.state.job_title} 
                                    onChange={this.handleTextChange} 
                                    required />
                                <TextField 
                                    id="pay_scale" 
                                    placeholder="Pay Scale" 
                                    value={this.state.pay_scale} 
                                    onChange={this.handleTextChange} 
                                    required />
                                <TextField 
                                    id="quantity" 
                                    placeholder="Quantity" 
                                    value={this.state.quantity} 
                                    onChange={this.handleTextChange} 
                                    required />
                                <TextField 
                                    id="hours" 
                                    placeholder="Hours" 
                                    value={this.state.hours} 
                                    onChange={this.handleTextChange} 
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
}

export default AddLabor