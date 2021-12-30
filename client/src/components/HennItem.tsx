import React from 'react';
import './HennItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

import CustomInputForm from './CustomInputForm';

// Services
import { hennsService } from '../services/henns.service';

// Utils
import { checkErrorsPresence } from '../utils/CheckErrorsPresence';


type Mode = 'EDIT' | 'VIEW';
interface State {
    mode: Mode;
    fields: {
        [key: string]: string
    },
    errors: {
        [key: string]: string
    },
    updatingStatus: 'LOADING' | 'RESOLVED'
}

class HennItem extends React.Component<Henn,State>{

    private inputNameRef: React.RefObject<CustomInputForm> = React.createRef();
    private inputBreedRef: React.RefObject<CustomInputForm> = React.createRef();
    
    constructor(props: Henn){
        super(props);
        this.state = {
            mode: 'VIEW',
            fields: {
                name: this.props.name,
                _temp_name: this.props.name,
                breed: this.props.breed,
                _temp_breed: this.props.breed,
            },
            errors: {
                name: '',
                breed: ''
            },
            updatingStatus: 'RESOLVED'
        }
    }

    /**
     * Change Form MODE (VIEW or EDIT)
    */ 
    changeMode(){
        if(this.state.mode === 'EDIT'){
            this.setState({
                mode: 'VIEW'
            });
        }else{
            this.setState({
                mode: 'EDIT'
            });
        }
    }

    /**
     * Stock returned values from CustomInput component into the State
    */ 
    inputChangeHandler = (inputName: string, inputValue: string, error: string): void => {

        let state: State = this.state;  

        state.fields['_temp_'+inputName] = inputValue;
        state.errors[inputName] = error;

        this.setState(state);
    }

    /**
     * Reset State's errors; and replace the _temp_ values by the last saved one
     * Go back to View mode
    */ 
    cancelCurrentChanges = (): void => {

        let state: State = this.state;  

        state.errors['name'] = '';
        state.fields['_temp_name'] = state.fields['name'];

        state.errors['breed'] = '';
        state.fields['_temp_breed'] = state.fields['breed'];

        state.mode = 'VIEW';
        
        this.inputNameRef.current?.resetInitialValue(state.fields['name']);
        this.inputBreedRef.current?.resetInitialValue(state.fields['breed']);

        this.setState(state);
    }

    /**
     * Update updating task status and call /POST henn
    */ 
    updateHenn = (): void => {

        this.setState({
            updatingStatus: 'LOADING'
        });

        let state: State = this.state;
        hennsService.updateHenn(
            this.props._id,
            {
                name: this.state.fields['_temp_name'],
                breed: this.state.fields['_temp_breed']
            }
        ).then((res) => {
            window.setTimeout(() => {
                state.mode = 'VIEW';
                state.updatingStatus = 'RESOLVED';
                state.fields['name'] = res.name;
                state.fields['breed'] = res.breed;
                this.setState(state);
            },2000); 
        });
    }

    render(): JSX.Element {
        return (
            <div className={ this.state.mode === 'VIEW' ? "HennItem view_mode" : "HennItem edit_mode" }>
                <img
                    src={this.props.imageUrl}
                    alt="Henn"
                />
                <div className="formDetails">
                    { 
                        this.state.mode === 'VIEW' && (
                            <button className="button_changeMode" onClick={() => this.changeMode()}>
                                <span>Edit</span>
                                <FontAwesomeIcon icon={faPenSquare} />
                            </button>
                        )
                    }
                    <CustomInputForm 
                        ref={this.inputNameRef} 
                        name="name" 
                        label="Name" 
                        mode={this.state.mode} 
                        value={this.state.mode === 'VIEW' ? this.state.fields['name'] : this.state.fields['_temp_name']}
                        onChange={this.inputChangeHandler}
                    />
                    <CustomInputForm 
                        ref={this.inputBreedRef} 
                        name="breed" 
                        label="Breed" 
                        mode={this.state.mode} 
                        value={this.state.mode === 'VIEW' ? this.state.fields['breed'] : this.state.fields['_temp_breed']}
                        onChange={this.inputChangeHandler}
                    />
                    { 
                        this.state.mode === 'EDIT' && (
                            <div className="formActions">
                                <button className="submitButton" disabled={checkErrorsPresence(this.state.errors) || this.state.updatingStatus !== 'RESOLVED'} onClick={() => this.updateHenn()}>
                                    {this.state.updatingStatus === 'RESOLVED' ? 'Update' : 'Updating ...'}
                                </button>
                                <button className="cancelButton" onClick={() => this.cancelCurrentChanges()}>
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default HennItem;