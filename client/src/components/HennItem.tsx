import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { hennsService, CreateHennRequest } from '../services/henns.service';

/** Class 'HennItem' rendering a MaterialUI Card with henn description */
class HennItem extends React.Component<any,{}>{

    // Array of henn's pictures
    private hennsImagesUrl: string[] = [
        '/assets/images/poule1.jpg',
        '/assets/images/poule2.jpg',
        '/assets/images/poule3.jpg'
    ];

    /** 
     * Get a random henn's picture's URL
     * @return {string} a concat String of public folder & a random URL from the hennsImagesUrl Array
    */
    getRandomImageUrl(){
        // Generate number between 0 and Array.length; cast it to integer using Math.floor()
        let randomPos: number = Math.floor(Math.random() * this.hennsImagesUrl.length);
        return process.env.PUBLIC_URL.concat(this.hennsImagesUrl[randomPos]);
    }   

    /** 
     * Set random info form selected henn
     * @return {string} The updated henn
    */
    updateInfo(){
        var body: CreateHennRequest = {
            name: this.props.name,
            breed: 'updatedBreed'
        }
        hennsService.updateHenn(this.props._id, body).then((res) => {
            this.props.cbFn();
        });
    }

    render() {
        return (
            <Card sx={{ width: 200, float: 'left', margin: 2 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={this.getRandomImageUrl()} 
                    alt="Henn"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { this.props.name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { this.props.breed }
                    </Typography>
                    <Button onClick={() => this.updateInfo()}>
                        Reset random info
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default HennItem;