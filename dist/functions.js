"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePresentationTitle = updatePresentationTitle;
exports.addSlide = addSlide;
exports.removeSlides = removeSlides;
exports.changeSlidePosition = changeSlidePosition;
exports.addTextElement = addTextElement;
exports.addPictureElement = addPictureElement;
exports.deleteObjects = deleteObjects;
exports.changeElementPosition = changeElementPosition;
exports.changeElementSize = changeElementSize;
exports.changeTextContent = changeTextContent;
exports.changeTextFontSize = changeTextFontSize;
exports.changeTextFontFamily = changeTextFontFamily;
exports.changeTextColor = changeTextColor;
exports.changeSlideBackground = changeSlideBackground;
function updatePresentationTitle(presentation, title) {
    return Object.assign(Object.assign({}, presentation), { title: title });
}
function addSlide(presentation) {
    const newSlide = creteSlide();
    let newSlideList;
    let newCurrentSlide;
    if (presentation.currentSlide === null) {
        newSlideList = [newSlide];
        newCurrentSlide = 0;
    }
    else {
        newSlideList = presentation.slideList.splice(presentation.currentSlide, 0, newSlide);
        newCurrentSlide = presentation.currentSlide + 1;
    }
    return Object.assign(Object.assign({}, presentation), { slideList: newSlideList, currentSlide: newCurrentSlide });
}
function removeSlides(presentation, slideIds) {
    const newSlides = presentation.slideList.filter(slide => !slideIds.includes(slide.id));
    let newCurrentSlide = null;
    if (newSlides.length > 0) {
        newCurrentSlide = newSlides.length > (presentation.currentSlide || 0) ? presentation.currentSlide : 0;
    }
    return Object.assign(Object.assign({}, presentation), { slideList: newSlides, currentSlide: newCurrentSlide });
}
function changeSlidePosition(presentation, newPosition) {
    if (presentation.currentSlide === null) {
        return Object.assign({}, presentation);
    }
    const slides = [...presentation.slideList];
    const [movedSlide] = slides.splice(presentation.currentSlide, 1);
    slides.splice(newPosition, 0, movedSlide);
    return Object.assign(Object.assign({}, presentation), { slideList: slides });
}
function addTextElement(slide) {
    return Object.assign(Object.assign({}, slide), { elements: [
            ...slide.elements,
            {
                id: generateId(),
                type: 'text',
                content: 'Новый текст',
                position: { x: 100, y: 100 },
                size: { width: 200, height: 100 },
                fontSize: 16,
                fontFamily: 'Arial',
                color: '#000000'
            }
        ] });
}
function addPictureElement(slide) {
    return Object.assign(Object.assign({}, slide), { elements: [
            ...slide.elements,
            {
                id: generateId(),
                type: 'picture',
                src: '../../image/new-image.jpeg',
                position: { x: 100, y: 100 },
                size: { width: 200, height: 100 },
            }
        ] });
}
function deleteObjects(slide, slideElementIds) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.filter(slideElement => !slideElementIds.includes(slideElement.id)) });
}
function changeElementPosition(slide, slideElementId, position) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { position: position });
        }) });
}
function changeElementSize(slide, slideElementId, size) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { size: size });
        }) });
}
function changeTextContent(slide, slideElementId, newTextContent) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { content: newTextContent });
        }) });
}
function changeTextFontSize(slide, slideElementId, newFontSize) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { fontSize: newFontSize });
        }) });
}
function changeTextFontFamily(slide, slideElementId, newFontFamiy) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { fontFamily: newFontFamiy });
        }) });
}
function changeTextColor(slide, slideElementId, newTextColor) {
    return Object.assign(Object.assign({}, slide), { elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return Object.assign(Object.assign({}, slideElement), { color: newTextColor });
        }) });
}
function changeSlideBackground(slide, background) {
    return Object.assign(Object.assign({}, slide), { background: background });
}
function creteSlide() {
    return {
        id: generateId(),
        background: '#FFFFFF',
        elements: []
    };
}
function generateId() {
    return `f${(+new Date().getMilliseconds()).toString(16)}`;
}
