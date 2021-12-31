import React from "react";
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HennItem from "./HennItem";

Enzyme.configure({ adapter: new Adapter() });

const mockHenn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

var wrapper: Enzyme.ReactWrapper;

describe("HennItem component", () => {

    beforeAll(() => {
        wrapper = mount(<HennItem {...mockHenn} />);
    });

    test("Should render HTML Element with 'HennItem' class", () => {
        expect(wrapper.find(".HennItem").exists()).toEqual(true);
    });

    test("changeMode() should update the State[mode]", () => {
        const shallowComponent = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);
        expect(shallowComponent.state('mode')).toEqual('VIEW');
        shallowComponent.instance().changeMode();
        expect(shallowComponent.state('mode')).toEqual('EDIT');
        shallowComponent.instance().changeMode();
        expect(shallowComponent.state('mode')).toEqual('VIEW');
    });

    test("Edit & Cancel button should update the State[mode]", () => {
        expect(wrapper.state('mode')).toEqual('VIEW');
        wrapper.find(".button_changeMode").simulate("click");
        expect(wrapper.state('mode')).toEqual('EDIT');
        wrapper.find(".cancelButton").simulate("click");
        expect(wrapper.state('mode')).toEqual('VIEW');
    });

    test("Should be initialized with MockHenn's informations into inputs", () => {
        expect(wrapper.find("input[name='name']").render().attr('value')).toEqual(mockHenn.name);
        expect(wrapper.find("input[name='breed']").render().attr('value')).toEqual(mockHenn.breed);
    });

    test("inputChangeHandler() should affect modified values to corresponding _temp_[inputName] State", () => {
        const shallowComponent = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);
        const updatedName: string = 'updatedName';
        expect(shallowComponent.state("fields")).toEqual({
            name: mockHenn.name,
            _temp_name: mockHenn.name,
            breed: mockHenn.breed,
            _temp_breed: mockHenn.breed,
        });
        shallowComponent.instance().inputChangeHandler('name',updatedName,'');
        expect(shallowComponent.state("fields")).toEqual({
            name: mockHenn.name,
            _temp_name: updatedName,
            breed: mockHenn.breed,
            _temp_breed: mockHenn.breed,
        });
    });

});