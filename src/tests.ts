import {
    Presentation,
    Slide,
    SlideElement,
    ElementSize,
    ElementPosition,
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

const minSlide: Slide = {
    id: 'min_slide1',
    elements: [],
    background: '#000000'
};

const minPresentation: Presentation = {
    id: 'min_pres',
    title: 'Empty Presentation',
    slideList: [],
    currentSlide: null
};

const pictureElement1Position: ElementPosition = {
    x: 100,
    y: 100
}

const pictureElement2Position: ElementPosition = {
    x: 200,
    y: 100
}

const textElement1Position: ElementPosition = {
    x: 100,
    y: 200
}

const textElement2Position: ElementPosition = {
    x: 200,
    y: 200
}

const pictureElement1Size: ElementSize = {
    width: 50,
    height: 20
}

const pictureElement2Size: ElementSize = {
    width: 20,
    height: 50
}

const textElement1Size: ElementSize = {
    width: 20,
    height: 20
}

const textElement2Size: ElementSize = {
    width: 50,
    height: 50
}

const pictureElement1: PictureElement = {
    id: 'picture_element1',
    type: 'picture',
    src: './image/test1.png',
    position: pictureElement1Position,
    size: pictureElement1Size,
};

const pictureElement2: PictureElement = {
    id: 'picture_element2',
    type: 'picture',
    src: './image/test2.png',
    position: pictureElement2Position,
    size: pictureElement2Size,
};

const textElement1: TextElement = {
    id: 'text_element1',
    type: 'text',
    content: 'maximal content 1',
    position: textElement1Position,
    size: textElement1Size,
    fontSize: 12,
    fontFamily: 'Arial',
    color: '#FF00FF',
};
const textElement2: TextElement = {
    id: 'text_element2',
    type: 'text',
    content: 'maximal content 2',
    position: textElement2Position,
    size: textElement2Size,
    fontSize: 14,
    fontFamily: 'Calibri',
    color: '#F0000F',
};

const slide1: Slide = {
    id: 'slide1',
    background: '#FF0000',
    elements: [textElement1, pictureElement1]
};

const slide2: Slide = {
    id: 'slide2',
    background: '#FFFF00',
    elements: [pictureElement2]
};

const slide3: Slide = {
    id: 'slide3',
    background: '#FFFFFF',
    elements: [textElement2]
};

const maxPresentation: Presentation = {
    id: 'max_presentation',
    title: 'Max Presentation',
    slideList: [slide1, slide2, slide3],
    currentSlide: 0
}

function testMinimalPresentation() {
    console.log('Test presentation with minimal data');

    const renamedPresentation = updatePresentationTitle(minPresentation, 'New test name');
    console.log('Rename presentation: ' + (renamedPresentation.title === 'New test name' ? 'done' : 'FAILED'));


    let presentationWithSlide = addSlide(minPresentation);
    console.log('Add slide to presentation: ' + (presentationWithSlide.slideList.length === 2 ? 'done' : 'FAILED'));
    presentationWithSlide = removeSlides(presentationWithSlide, [presentationWithSlide.slideList[0].id]);
    console.log('Remove slide from presentation: ' + (presentationWithSlide.slideList.length === 0 ? 'done' : 'FAILED'));


    let presentationWithSlideToMove = addSlide(minPresentation);
    const movedSlideId = presentationWithSlideToMove.slideList[0].id;
    presentationWithSlideToMove = addSlide(presentationWithSlideToMove);
    presentationWithSlideToMove = addSlide(presentationWithSlideToMove);
    presentationWithSlideToMove = changeSlidePosition(presentationWithSlideToMove, 2);
    console.log('Move slide: ' + (presentationWithSlideToMove.slideList[2].id === movedSlideId ? 'done' : 'FAILED'));


    let slideWithElements = addTextElement(minSlide);
    console.log('Add text element on slide: ' + (slideWithElements.elements.length === 1 && slideWithElements.elements[0].type === 'text' ? 'done' : 'FAILED'));
    const textElementId = slideWithElements.elements[0].id;
    slideWithElements = addPictureElement(slideWithElements);
    console.log('Add picture element on slide: ' + (slideWithElements.elements.length === 2 && slideWithElements.elements[1].type === 'picture' ? 'done' : 'FAILED'));
    const pictureElementId = slideWithElements.elements[1].id;
    slideWithElements = deleteObjects(slideWithElements, [pictureElementId]);
    console.log('Remove picture element from slide: ' + (slideWithElements.elements.length === 1 && slideWithElements.elements[0].type === 'text' ? 'done' : 'FAILED'));
    slideWithElements = deleteObjects(slideWithElements, [textElementId]);
    console.log('Remove text element from slide: ' + (slideWithElements.elements.length === 0 ? 'done' : 'FAILED'));


    let slideWithMovedElement = addPictureElement(minSlide);
    const changedPositionSlideElementId = slideWithMovedElement.elements[0].id;
    slideWithMovedElement = changeElementPosition(slideWithMovedElement, changedPositionSlideElementId, {
        x: 150,
        y: 150
    });
    console.log('Elemenet moved to 150 150: ' + (slideWithMovedElement.elements[0].position.x === 150 && slideWithMovedElement.elements[0].position.y === 150 ? 'done' : 'FAILED'));
    slideWithMovedElement = changeElementPosition(slideWithMovedElement, changedPositionSlideElementId, {x: 13, y: 11});
    console.log('Elemenet moved to 13 11: ' + (slideWithMovedElement.elements[0].position.x === 13 && slideWithMovedElement.elements[0].position.y === 11 ? 'done' : 'FAILED'));

    let slideWithChangedElementSize = addPictureElement(minSlide);
    const changedSizeElementId = slideWithChangedElementSize.elements[0].id;
    slideWithChangedElementSize = changeElementSize(slideWithChangedElementSize, changedSizeElementId, {
        width: 150,
        height: 150
    });
    console.log('Elemenet resized to 150x150: ' + (slideWithChangedElementSize.elements[0].size.width === 150 && slideWithChangedElementSize.elements[0].size.height === 150 ? 'done' : 'FAILED'));
    slideWithChangedElementSize = changeElementSize(slideWithChangedElementSize, changedSizeElementId, {
        width: 13,
        height: 11
    });
    console.log('Elemenet resized to 13x11: ' + (slideWithChangedElementSize.elements[0].size.width === 13 && slideWithChangedElementSize.elements[0].size.height === 11 ? 'done' : 'FAILED'));

    let slideWithText = addTextElement(minSlide);
    const textElementIdToChangeFont = slideWithText.elements[0].id;
    slideWithText = changeTextFontSize(slideWithText, textElementIdToChangeFont, 15);
    slideWithText = changeTextFontFamily(slideWithText, textElementIdToChangeFont, 'Arial');
    slideWithText = changeTextColor(slideWithText, textElementIdToChangeFont, '#FF00FF');
    slideWithText = changeTextContent(slideWithText, textElementIdToChangeFont, 'Test1');
    let changetTextElement: SlideElement = slideWithText.elements[0];
    console.log('Test change text element propeties: ' + (
        changetTextElement.type === 'text'
        && changetTextElement.fontSize === 15
        && changetTextElement.fontFamily === 'Arial'
        && changetTextElement.color === '#FF00FF'
        && changetTextElement.content === 'Test1'
            ? 'done'
            : 'FAILED')
    );
    slideWithText = changeTextFontSize(slideWithText, textElementIdToChangeFont, 22);
    slideWithText = changeTextFontFamily(slideWithText, textElementIdToChangeFont, 'Timew New Roman');
    slideWithText = changeTextColor(slideWithText, textElementIdToChangeFont, '#00FF00');
    slideWithText = changeTextContent(slideWithText, textElementIdToChangeFont, '2Test');
    changetTextElement = slideWithText.elements[0];
    console.log('Test change text element propeties: ' + (
        changetTextElement.type === 'text'
        && changetTextElement.fontSize === 22
        && changetTextElement.fontFamily === 'Timew New Roman'
        && changetTextElement.color === '#00FF00'
        && changetTextElement.content === '2Test'
            ? 'done'
            : 'FAILED')
    );

    let slideWithChangedBackground = changeSlideBackground(minSlide, '#FFF000');
    console.log('Slide background changed to #FFF000: ' + (slideWithChangedBackground.background === '#FFF000' ? 'done' : 'FAILED'));
    slideWithChangedBackground = changeSlideBackground(slideWithChangedBackground, '#000FFF');
    console.log('Slide background changed to #000FFF: ' + (slideWithChangedBackground.background === '#000FFF' ? 'done' : 'FAILED'));

    console.log('Minimal presentation version tests done.');
}


function testMaximalPresentation() {
    console.log('Test presentation with maximal data');

    const renamedPresentation = updatePresentationTitle(maxPresentation, 'New test name');
    console.log('Rename presentation: ' + (renamedPresentation.title === 'New test name' ? 'done' : 'FAILED'));


    const presentationBeforeAddSlideCount = 3;
    let presentationWithSlide = addSlide(maxPresentation);
    console.log('Add slide to presentation: ' + (presentationWithSlide.slideList.length === presentationBeforeAddSlideCount + 1 ? 'done' : 'FAILED'));
    presentationWithSlide = removeSlides(presentationWithSlide, ['slide1']);
    console.log('Remove slide from presentation: ' + (presentationWithSlide.slideList.length === presentationBeforeAddSlideCount ? 'done' : 'FAILED'));
    console.log('Presentation with id "slde1" removed: ' + (presentationWithSlide.slideList.findIndex(slide => slide.id === 'slide1') === -1 ? 'done' : 'FAILED'))

    const presentationWithSlideToMove = changeSlidePosition(maxPresentation, 2);
    console.log('Move slide: ' + (presentationWithSlideToMove.slideList[2].id === 'slide1' ? 'done' : 'FAILED'));


    let slideWithElements = addTextElement(slide1);
    console.log('Add text element on slide: ' + (slideWithElements.elements.length === 3 && slideWithElements.elements[2].type === 'text' ? 'done' : 'FAILED'));
    slideWithElements = addPictureElement(slideWithElements);
    console.log('Add picture element on slide: ' + (slideWithElements.elements.length === 4 && slideWithElements.elements[3].type === 'picture' ? 'done' : 'FAILED'));
    slideWithElements = deleteObjects(slideWithElements, ['picture_element1']);
    console.log('Remove picture element from slide: ' + (slideWithElements.elements.findIndex(slideElement => slideElement.id === 'picture_element2') === -1
        ? 'done'
        : 'FAILED')
    );
    slideWithElements = deleteObjects(slideWithElements, ['text_element1']);
    console.log('Remove text element from slide: ' + (slideWithElements.elements.findIndex(slideElement => slideElement.id === 'text_element2') === -1
        ? 'done'
        : 'FAILED')
    );

    let slideWithMovedElement = changeElementPosition(slide2, 'picture_element2', {x: 150, y: 150});
    console.log('Elemenet moved to 150 150: ' + (slideWithMovedElement.elements[0].position.x === 150 && slideWithMovedElement.elements[0].position.y === 150 ? 'done' : 'FAILED'));
    slideWithMovedElement = changeElementPosition(slideWithMovedElement, 'picture_element2', {x: 13, y: 11});
    console.log('Elemenet moved to 13 11: ' + (slideWithMovedElement.elements[0].position.x === 13 && slideWithMovedElement.elements[0].position.y === 11 ? 'done' : 'FAILED'));

    let slideWithChangedElementSize = addPictureElement(slide3);
    slideWithChangedElementSize = changeElementSize(slideWithChangedElementSize, 'text_element2', {
        width: 150,
        height: 150
    });
    console.log('Elemenet resized to 150x150: ' + (slideWithChangedElementSize.elements[0].size.width === 150 && slideWithChangedElementSize.elements[0].size.height === 150 ? 'done' : 'FAILED'));
    slideWithChangedElementSize = changeElementSize(slideWithChangedElementSize, 'text_element2', {
        width: 13,
        height: 11
    });
    console.log('Elemenet resized to 13x11: ' + (slideWithChangedElementSize.elements[0].size.width === 13 && slideWithChangedElementSize.elements[0].size.height === 11 ? 'done' : 'FAILED'));

    let slideWithText = changeTextFontSize(slide3, 'text_element2', 15);
    slideWithText = changeTextFontFamily(slideWithText, 'text_element2', 'Arial');
    slideWithText = changeTextColor(slideWithText, 'text_element2', '#FF00FF');
    slideWithText = changeTextContent(slideWithText, 'text_element2', 'Test1');
    let changetTextElement: SlideElement = slideWithText.elements[0];
    console.log('Test change text element propeties: ' + (
        changetTextElement.type === 'text'
        && changetTextElement.fontSize === 15
        && changetTextElement.fontFamily === 'Arial'
        && changetTextElement.color === '#FF00FF'
        && changetTextElement.content === 'Test1'
            ? 'done'
            : 'FAILED')
    );
    slideWithText = changeTextFontSize(slideWithText, 'text_element2', 22);
    slideWithText = changeTextFontFamily(slideWithText, 'text_element2', 'Timew New Roman');
    slideWithText = changeTextColor(slideWithText, 'text_element2', '#00FF00');
    slideWithText = changeTextContent(slideWithText, 'text_element2', '2Test');
    changetTextElement = slideWithText.elements[0];
    console.log('Test change text element propeties: ' + (
        changetTextElement.type === 'text'
        && changetTextElement.fontSize === 22
        && changetTextElement.fontFamily === 'Timew New Roman'
        && changetTextElement.color === '#00FF00'
        && changetTextElement.content === '2Test'
            ? 'done'
            : 'FAILED')
    );

    let slideWithChangedBackground = changeSlideBackground(slide1, '#FFF000');
    console.log('Slide background changed to #FFF000: ' + (slideWithChangedBackground.background === '#FFF000' ? 'done' : 'FAILED'));
    slideWithChangedBackground = changeSlideBackground(slideWithChangedBackground, '#000FFF');
    console.log('Slide background changed to #000FFF: ' + (slideWithChangedBackground.background === '#000FFF' ? 'done' : 'FAILED'));

    console.log('Maximal presentation version tests done.');
}

export default function testFunctions() {
    console.log('Start testing');
    testMinimalPresentation();
    testMaximalPresentation();

    console.log('All tests done.');
}

testFunctions();