import React from 'react';
import { errorMessages } from '../lib/errorMessages';
import { InputFormatValidator } from '../utils/InputFormatValidator';

import './CustomInputForm.css';

interface Props {
    ref?: React.LegacyRef<CustomInputForm>
    name: string
    label: string
    mode: 'EDIT' | 'VIEW'
    value: string
    onChange: (inputName: string, inputValue: string, error: string) => void
}
interface State {
    value: string
    error: boolean
}

class CustomInputForm extends React.Component<Props,State> {

    constructor(props: Props){
        super(props);
        this.state = {
            value: props.value,
            error: false
        }
    }

    errorMessage = (_inputName: string): string => {
        return errorMessages.find(elem => elem.inputName === _inputName)?.message || '';
    }
   
    onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {

        this.setState({ 
            value: e.target.value,
            error: (!InputFormatValidator(e.target.value)),
        });

        this.props.onChange(
            e.target.name, 
            e.target.value, 
            InputFormatValidator(e.target.value) ? '' : this.errorMessage(e.target.name)
        );
    }

    resetInitialValue = (inputValue: string): void => {
        this.setState({
            value: inputValue,
            error: false
        })
    }

    render(){
        return (
            <div className={this.state.error && this.props.mode === 'EDIT' ? 'InputForm error' : 'InputForm'}>
                <label>{this.props.label}</label>
                <input 
                    type="text"
                    name={this.props.name} 
                    onChange={this.onChangeHandler}
                    value={this.state.value}
                    readOnly={this.props.mode === 'VIEW'}
                />
                {this.state.error && this.props.mode === 'EDIT' && (
                    <span className="errorMsg">{this.errorMessage(this.props.name)}</span>
                )}
            </div>
        )
    }
}

export default CustomInputForm;