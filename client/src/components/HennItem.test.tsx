import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HennItem from "./HennItem";
import { loadingHennsResult, updatedHennResult, createdHennResult } from '../__mocksData__/fetchResults';

Enzyme.configure({ adapter: new Adapter() });

const mockHenn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

const wrapper = Enzyme.shallow<HennItem>(<HennItem {...mockHenn} />);   

beforeAll(() => {
    global.fetch = jest.fn((
        url: RequestInfo, 
        optn: RequestInit
    ) => {
            if(typeof optn.method !== undefined){
                switch(optn.method){
                    case 'GET':
                        return Promise.resolve({
                            json: () => Promise.resolve(loadingHennsResult),
                        });
                    case 'POST':
                        return Promise.resolve({
                            json: () => Promise.resolve(createdHennResult),
                        });
                    case 'PATCH':
                        return Promise.resolve({
                            json: () => Promise.resolve(updatedHennResult),
                        });
                }
            }
        }
    ) as jest.Mock;
});

describe("HennItem Component", () => {

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
        return wrapper.instance().updateHenn(updatedHennResult._id, updatedHennResult.name, updatedHennResult.breed)
        .then(res => {
            expect(wrapper.state('updatingStatus')).toEqual('RESOLVED');
            expect(res).toEqual(updatedHennResult);
        });
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