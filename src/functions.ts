import {
    Presentation,
    SlideList,
    Slide,
    SlideElement,
    ElementSize,
    ElementPosition,
} from "./types";

function updatePresentationTitle(presentation: Presentation, title: string): Presentation {
    return {
        ...presentation,
        title: title
    };
}

function addSlide(presentation: Presentation): Presentation {
    const newSlide = creteSlide();
    let newSlideList: SlideList;
    let newCurrentSlide: number;

    if (presentation.currentSlide === null) {
        newSlideList = [newSlide];
        newCurrentSlide = 0;
    } else {
        newSlideList = presentation.slideList.splice(presentation.currentSlide, 0, newSlide);
        newCurrentSlide = presentation.currentSlide + 1;
    }

    return {
        ...presentation,
        slideList: newSlideList,
        currentSlide: newCurrentSlide
    }
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    const newSlides: SlideList = presentation.slideList.filter(slide => !slideIds.includes(slide.id));

    let newCurrentSlide: number | null = null;

    if (newSlides.length > 0) {
        newCurrentSlide = newSlides.length > presentation.currentSlide ? presentation.currentSlide : 0;
    }

    return {
        ...presentation,
        slideList: newSlides,
        currentSlide: newCurrentSlide
    }
}

function changeSlidePosition(presentation: Presentation, newPosition: number): Presentation {
    if (presentation.currentSlide === null) {
        return {...presentation};
    }

    const slides = [...presentation.slideList];
    const [movedSlide] = slides.splice(presentation.currentSlide, 1);
    slides.splice(newPosition, 0, movedSlide);


    return {
        ...presentation,
        slideList: slides
    }
}

function addText(slide: Slide): Slide {
    return {
        ...slide,
        elements: [
            ...slide.elements,
            {
                id: generateId(),
                type: 'text',
                content: 'Новый текст',
                position: {x: 100, y: 100},
                size: {width: 200, height: 100},
                fontSize: 16,
                fontFamily: 'Arial',
                color: '#000000'
            }
        ]
    };
}

function addPicture(slide: Slide): Slide {
    return {
        ...slide,
        elements: [
            ...slide.elements,
            {
                id: generateId(),
                type: 'picture',
                src: '../../image/new-image.jpeg',
                position: {x: 100, y: 100},
                size: {width: 200, height: 100},
            }
        ]
    };
}

function deleteObjects(slide: Slide, slideElementIds: string[]): Slide {
    return {
        ...slide,
        elements: slide.elements.filter(slideElement => !slideElementIds.includes(slideElement.id))
    };
}

function changeElementPosition(slide: Slide, slideElementId: string, position: ElementPosition): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                position: position
            } as SlideElement;
        })
    };
}

function changeElementSize(slide: Slide, slideElementId: string, size: ElementSize): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                size: size
            } as SlideElement;
        })
    };
}

function changeTextContent(slide: Slide, slideElementId: string, newTextContent: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                content: newTextContent
            } as SlideElement;
        })
    };
}

function changeTextFontSize(slide: Slide, slideElementId: string, newFontSize: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                fontSize: newFontSize
            } as SlideElement;
        })
    };
}

function changeTextFontFamily(slide: Slide, slideElementId: string, newFontFamiy: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                fontFamily: newFontFamiy
            } as SlideElement;
        })
    };
}

function changeTextColor(slide: Slide, slideElementId: string, newTextColor: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                color: newTextColor
            } as SlideElement;
        })
    };
}

function changeSlideBackground(slide: Slide, background: string): Slide {
    return {
        ...slide,
        background: background
    };
}

function creteSlide(): Slide {
    return {
        id: generateId(),
        background: '#FFFFFF',
        elements: []
    }
}

function generateId(): string {
    return `f${(+new Date().getMilliseconds()).toString(16)}`;
}
