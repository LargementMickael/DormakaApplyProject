import React from "react";
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HennItem from "./HennItem";
import { hennsService, UpdateHennRequest } from '../services/henns.service';

jest.spyOn(hennsService, 'updateHenn').mockImplementation((id: string, params: UpdateHennRequest) => new Promise((resolve,reject) => {
    resolve({
        _id: '',
        name: 'UpdatedName',
        breed: 'UpdatedBreed'
    })
}));

Enzyme.configure({ adapter: new Adapter() });

const mockHenn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

const wrapper = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);   

jest.mock('../services/henns.service');

describe("HennItem component", () => {

    beforeAll(() => {
        // wrapper = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);   
    });

    test("Should render HTML Element with 'HennItem' class", () => {
        expect(wrapper.find(".HennItem").exists()).toEqual(true);
    });

    test("changeMode() should update the State[mode]", () => {
        expect(wrapper.state('mode')).toEqual('VIEW');
        wrapper.instance().changeMode();
        expect(wrapper.state('mode')).toEqual('EDIT');
        wrapper.instance().changeMode();
        expect(wrapper.state('mode')).toEqual('VIEW');
    });

    test("Edit & Cancel button should update the State[mode]", () => {
        expect(wrapper.state('mode')).toEqual('VIEW');
        wrapper.find(".button_changeMode").simulate("click");
        expect(wrapper.state('mode')).toEqual('EDIT');
        wrapper.find(".cancelButton").simulate("click");
        expect(wrapper.state('mode')).toEqual('VIEW');
    });

    test("Should be initialized with MockHenn's informations into inputs", () => {
        var mountWrapper = Enzyme.mount(<HennItem {...mockHenn} />);
        expect(mountWrapper.find("input[name='name']").render().attr('value')).toEqual(mockHenn.name);
        expect(mountWrapper.find("input[name='breed']").render().attr('value')).toEqual(mockHenn.breed);
    });

    test("inputChangeHandler() should update State", () => {
        const updatedHenn: Henn = {
            _id: '',
            name: "UpdatedName",
            breed: "UpdatedBreed",
            imageUrl: ""
        }
        wrapper.instance().inputChangeHandler('name',updatedHenn.name,'');
        expect(wrapper.state('fields')._temp_name).toEqual(updatedHenn.name);
    });

    test("Update Henn", () => {
        const updatedHenn: Henn = {
            _id: '',
            name: 'UpdatedName',
            breed: 'UpdatedBreed'
        }
        wrapper.instance().updateHenn(updatedHenn._id, updatedHenn.name, updatedHenn.breed);
    });

    test('Submit Form button should call updateHenn method from Component', () => {
        const updateHennMethodSpy = jest.spyOn(wrapper.instance(), 'updateHenn');
        expect(wrapper.state('mode')).toEqual('VIEW');
        wrapper.find(".button_changeMode").simulate("click");
        expect(wrapper.state('mode')).toEqual('EDIT');
        wrapper.find(".submitButton").simulate('click');
        expect(updateHennMethodSpy).toHaveBeenCalledTimes(1);
    });

});