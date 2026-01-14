"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const minimalPresentation = {
    id: "min_pres",
    title: "Empty Presentation",
    slideList: [],
    currentSlide: null
};
function testMinimalPresentation() {
    console.log('Test presentation with minimal data');
    const renamedPresentation = (0, functions_1.updatePresentationTitle)(minimalPresentation, 'New test name');
    console.log('Rename presentation: ' + (renamedPresentation.title === 'New test name' ? 'done' : 'failed'));
}
function testFunctions() {
    console.log('Start testing');
    testMinimalPresentation();
    console.log('All tests done.');
}
testFunctions();
