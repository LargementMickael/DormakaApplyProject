import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { hennsService, CreateHennRequest } from '../services/henns.service';

const HennForm = (props: any): JSX.Element => {
    
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');

    const handleSave = () => {
        var body: CreateHennRequest = {
            name: name,
            breed: breed
        }
        hennsService.createHenn(body).then((res) => {
            console.log(res);
            props.cbFn();
        });
    }

    return (
        <form id="hennForm">
            <TextField 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Breed" 
                variant="outlined" 
                value={breed} 
                onChange={(e) => setBreed(e.target.value)} 
                style={{marginLeft: 15}}
            />
            <Button onClick={() => handleSave()}>
                Create
            </Button>
        </form>
    )
}

export default HennForm;