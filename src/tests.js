import { updatePresentationTitle, } from "./functions.ts";
var minimalPresentation = {
    id: "min_pres",
    title: "Empty Presentation",
    slideList: [],
    currentSlide: null
};
function testMinimalPresentation() {
    console.log('Test presentation with minimal data');
    var renamedPresentation = updatePresentationTitle(minimalPresentation, 'New test name');
    console.log('Rename presentation: ' + (renamedPresentation.title === 'New test name' ? 'done' : 'failed'));
}
function testFunctions() {
    console.log('Start testing');
    testMinimalPresentation();
    console.log('All tests done.');
}
testFunctions();
