function updatePresentationTitle(presentation, title) {
    return {
        ...presentation,
        title: title
    };
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
    return {
        ...presentation,
        slideList: newSlideList,
        currentSlide: newCurrentSlide
    };
}
function removeSlides(presentation, slideIds) {
    const newSlides = presentation.slideList.filter(slide => !slideIds.includes(slide.id));
    let newCurrentSlide = null;
    if (newSlides.length > 0) {
        newCurrentSlide = newSlides.length > presentation.currentSlide ? presentation.currentSlide : 0;
    }
    return {
        ...presentation,
        slideList: newSlides,
        currentSlide: newCurrentSlide
    };
}
function changeSlidePosition(presentation, newPosition) {
    if (presentation.currentSlide === null) {
        return { ...presentation };
    }
    const slides = [...presentation.slideList];
    const [movedSlide] = slides.splice(presentation.currentSlide, 1);
    slides.splice(newPosition, 0, movedSlide);
    return {
        ...presentation,
        slideList: slides
    };
}
function addText(slide) {
    return {
        ...slide,
        elements: [
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
        ]
    };
}
function addPicture(slide) {
    return {
        ...slide,
        elements: [
            ...slide.elements,
            {
                id: generateId(),
                type: 'picture',
                src: '../../image/new-image.jpeg',
                position: { x: 100, y: 100 },
                size: { width: 200, height: 100 },
            }
        ]
    };
}
function deleteObjects(slide, slideElementIds) {
    return {
        ...slide,
        elements: slide.elements.filter(slideElement => !slideElementIds.includes(slideElement.id))
    };
}
function changeElementPosition(slide, slideElementId, position) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                position: position
            };
        })
    };
}
function changeElementSize(slide, slideElementId, size) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                size: size
            };
        })
    };
}
function changeTextContent(slide, slideElementId, newTextContent) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                content: newTextContent
            };
        })
    };
}
function changeTextFontSize(slide, slideElementId, newFontSize) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                fontSize: newFontSize
            };
        })
    };
}
function changeTextFontFamily(slide, slideElementId, newFontFamiy) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                fontFamily: newFontFamiy
            };
        })
    };
}
function changeTextColor(slide, slideElementId, newTextColor) {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return {
                ...slideElement,
                color: newTextColor
            };
        })
    };
}
function changeSlideBackground(slide, background) {
    return {
        ...slide,
        background: background
    };
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
export {};
