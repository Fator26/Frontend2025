import {
    Presentation,
    SlideList,
    Slide,
    SlideElement,
    ElementSize,
    ElementPosition,
    Selection,
    TextElement,
    PictureElement
} from "./types";

import {
    updatePresentationTitle,
    addSlide,
    removeSlides,
    changeSlidePosition,
    addTextElement,
    addPictureElement,
    deleteObjects,
    changeElementPosition,
    changeElementSize,
    changeTextContent,
    changeTextFontSize,
    changeTextFontFamily,
    changeTextColor,
    changeSlideBackground,
} from "./functions";

const minimalPresentation: Presentation = {
    id: "min_pres",
    title: "Empty Presentation",
    slideList: [],
    currentSlide: null
};

function testMinimalPresentation() {
    console.log('Test presentation with minimal data');

    const renamedPresentation = updatePresentationTitle(minimalPresentation, 'New test name');
    console.log('Rename presentation: ' + (renamedPresentation.title === 'New test name' ? 'done' : 'failed'));
}

function testFunctions() {
    console.log('Start testing');
    testMinimalPresentation();

    console.log('All tests done.');
}

testFunctions();