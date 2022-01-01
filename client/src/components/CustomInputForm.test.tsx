import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import CustomInputForm from "./CustomInputForm";
import HennItem from './HennItem';
import { errorMessages } from '../lib/errorMessages';

Enzyme.configure({ adapter: new Adapter() });

const mockHenn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

const hennItemWrapper = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);   
const wrapper = Enzyme.shallow<CustomInputForm>(<CustomInputForm 
    name="name" 
    label="Name" 
    mode='EDIT'
    value='InitValue'
    onChange={hennItemWrapper.instance().inputChangeHandler}
/>);   

describe("CustomInputForm component", () => {

    test("Should render HTML Element with 'InputForm' class", () => {
        expect(wrapper.find(".InputForm").exists()).toEqual(true);
    });

    test("ErrorMessage method should return message or nothing", () => {
        expect(errorMessages.map(el => el.message)).toContain(wrapper.instance().errorMessage('name'));
        expect(errorMessages.map(el => el.message)).toContain(wrapper.instance().errorMessage('breed'));
    });

    test("onChangeHandler should be called", () => {
        wrapper.find("input").simulate('change', { target: { value: 'TEST' } });
    });

    test("resetInitialValue method should be called", () => {
        wrapper.instance().resetInitialValue("initialValue");
        expect(wrapper.state('value')).toEqual("initialValue");    
    });

    test("onChangeHandler method should be called", () => {
        const wrapper = Enzyme.shallow<CustomInputForm>(<CustomInputForm 
            name="name" 
            label="Name" 
            mode='EDIT'
            value='InitValue'
            onChange={jest.fn()}
        />);  
        wrapper.find("input").simulate('change', { target: { value: 'TEST' } });
    });

});