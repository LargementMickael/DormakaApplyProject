import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HennItem from "./HennItem";

Enzyme.configure({ adapter: new Adapter() });

const mockHenn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

var wrapper: any;

describe("HennItem component", () => {

    beforeAll(() => {
        wrapper = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);   
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
});