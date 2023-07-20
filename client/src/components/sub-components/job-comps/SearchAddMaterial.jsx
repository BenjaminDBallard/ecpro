import { useState, Fragment } from 'react'
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

export default function SearchAddMaterial(props) {

    const [searchTerm, setSearchTerm] = useState("")
    const [materialsAddData, setMaterialsAddData] = useState({})
    const [selectedData, setSelectedData] = useState({})
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

    const handleSelect = (index) => {
        setSelectedData(materialsAddData[index])
    }

    const handleTextChange = (e, valueType) => {
        let value = valueType === "number" ? parseInt(e.target.value) : e.target.value
        const newState = { ...formState }
        
        newState[e.target.id] = value
        setFormState(newState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const val = selectedData
        const payload = { ...formState }
        payload.job_id = props.job_id
        payload.name = val.name
        payload.product_id = val.game_indices[0].game_index,
        payload.upc = val.stats[0].base_stat,
        payload.brand = val.game_indices[0].version.name,
        payload.price = val.base_experience,
        payload.description = val.types[0].type.name,
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

    let pokemonList = []
    fetchKantoPokemon()

    

    function fetchPokemonData(pokemon){
        let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
          fetch(url)
          .then(response => response.json())
          .then(function(pokeData){
          pokemonList.push(pokeData)
          if (pokemonList.length === 20){
            setMaterialsAddData(pokemonList)
          }
          
          })
        }

    function fetchKantoPokemon(){
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
         .then(response => response.json())
         .then(function(allpokemon){
         allpokemon.results.forEach(function(pokemon){
           fetchPokemonData(pokemon); 
         })
        })
       }

    return(
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
                <Dialog fullWidth maxWidth="md" open={formState.open} onClose={toggleDialog} sx={{position: 'absolute', display: 'flex', top: '600px', justifyContent: 'center', height: '800px'}}>
                    
                    <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
                        {(typeof materialsAddData[0] === 'undefined') ? (
                            <Container sx={{margin: '200px auto', textAlign: 'center'}}>
                                <Typography variant="h4">Loading...</Typography>
                            </Container>
                        ) : (
                        <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', rowGap: "20px" }}>
                            <Container fullWidth disableGutters sx={{position: '', display: 'flex', flexDirection: 'column', justifyContent:'space-between', padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px'}}>
                                <DialogTitle>Add Material</DialogTitle>
                                <TextField 
                                    type="text" 
                                    placeholder='Search...' 
                                    sx={{}}
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value)
                                    }}
                                />
                            </Container>
                            
                            <Table>
                                <TableHead>
                                   
                                <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>UPC</TableCell>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Select</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {materialsAddData.filter((val)=> {
                                    if (searchTerm == "") {
                                        return val
                                    }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map((val, key) => {
                                    return(
                                    <TableRow key={key}>
                                        <TableCell>{val.name}</TableCell>
                                        <TableCell>{val.game_indices[0].game_index}</TableCell>
                                        <TableCell>{val.stats[0].base_stat}</TableCell>
                                        <TableCell>{val.game_indices[0].version.name}</TableCell>
                                        <TableCell>{val.base_experience}</TableCell>
                                        <TableCell>{val.types[0].type.name}</TableCell>
                                        <TableCell>
                                            <TextField 
                                            id="quantity" 
                                            placeholder="Quantity" 
                                            value={formState.quantity} 
                                            onChange={(e) => handleTextChange(e, "integer")} 
                                            required />
                                        </TableCell>
                                        <TableCell><Button variant="contained" color="success" onClick={() => handleSelect(key)} type="submit">Select</Button></TableCell>
                                    </TableRow>
                                )})}
                                </TableBody>
                            </Table>
                        </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </Fragment>
        
    )
}
