import React from "react";
import { act, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import HennItem from "./HennItem";

let container: HTMLElement;

const henn: Henn = {
    _id: '',
    name: "HennName",
    breed: "HennBreed",
    imageUrl: ""
}

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => ReactDOM.render(<HennItem {...henn} />, container));
});

test("Should render", () => {
    expect(screen.getAllByAltText('Henn').length).toBeGreaterThanOrEqual(1);
});

test("Should display correct Henn's name", () => {
    const inputElems = screen.getAllByDisplayValue('HennName');
    expect(inputElems.length).toBeGreaterThanOrEqual(1);
});