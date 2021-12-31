import React from "react";
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import CustomInputForm from "./CustomInputForm";
import HennItem from './HennItem';

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

});