import React from 'react';
import { hennsService, CreateHennRequest } from '../services/henns.service';
import CustomInputForm from './CustomInputForm';

import { checkErrorsPresence } from '../utils/CheckErrorsPresence';

import "./HennForm.css";

interface Props {
    addHennCb: (elem: Henn) => void,
}
interface State {
    fields: {
        [key: string]: string
    },
    errors: {
        [key: string]: string
    },
    requestStatus: string
    requestError: string
}

class HennForm extends React.Component <Props,State> {

    // Array of henn's pictures
    private hennsImagesUrl: string[] = [
        '/assets/images/poule1.jpg',
        '/assets/images/poule2.jpg',
        '/assets/images/poule3.jpg'
    ];

    constructor(props: Props){
        super(props);
        this.state = {
            fields: {
                name: '',
                breed: '',
            },
            errors: {
                name: '',
                breed: ''
            },
            requestStatus: 'RESOLVED',
            requestError: ''
        }
    }

    /** 
     * Get a random henn's picture's URL
     * Generate number between 0 and Array.length; cast it to integer using Math.floor()
     * @return {string} a concat String of public folder & a random URL from the hennsImagesUrl Array
    */
    getRandomImageUrl = () => {
        let randomPos: number = Math.floor(Math.random() * this.hennsImagesUrl.length);
        return this.hennsImagesUrl[randomPos];
    }  

    /**
    * Stock returned values from CustomInput component into the State
    */ 
    inputChangeHandler = (inputName: string, inputValue: string, error: string): void => {

        let state: State = this.state;

        state.fields[inputName] = inputValue;
        state.errors[inputName] = error;
     
        this.setState(state);
    }

    handleSave = (e: React.FormEvent) => {

        e.preventDefault();

        this.setState({
            requestStatus: 'LOADING'
        })

        var body: CreateHennRequest = {
            name: this.state.fields['name'],
            breed: this.state.fields['breed'],
            imageUrl: this.getRandomImageUrl()
        }
        hennsService.createHenn(body)
        .then((res) => {
            this.props.addHennCb(res);
            this.setState({
                requestStatus: 'RESOLVED'
            })
        })
        .catch(err => {
            console.error(err);
            this.setState({
                requestError: 'Error while trying to create new henn',
                requestStatus: 'REJECTED'
            })
            window.setTimeout(() => {
                this.setState({
                    requestError: ''
                })
            },2000);
        })
    }
    
    render(){
        return (
            <div className="row">
                <form id="HennForm">
                    <CustomInputForm 
                        name="name" 
                        label="Name" 
                        mode='EDIT' 
                        value={this.state.fields['name']}
                        onChange={this.inputChangeHandler}
                    />
                    <CustomInputForm 
                        name="breed" 
                        label="Breed" 
                        mode='EDIT'
                        value={this.state.fields['breed']}
                        onChange={this.inputChangeHandler}
                    />
                    <div className="formActions">
                        <input 
                            type='submit'
                            onClick={e => this.handleSave(e)}
                            disabled={checkErrorsPresence(this.state.errors) || this.state.fields['name'] === "" || this.state.fields['breed'] === "" || this.state.requestStatus === 'LOADING'} 
                            value={this.state.requestStatus === 'RESOLVED' ? 'Save' : (this.state.requestStatus === 'REJECTED' ? 'Try again' : 'Saving ...')} 
                        />
                        <span className="error">
                            {this.state.requestError}
                        </span>
                    </div>
                </form>
            </div>
        )   
    }
}

export default HennForm;