import {
    Presentation,
    SlideList,
    Slide,
    SlideElement,
    ElementSize,
    ElementPosition
} from "./types";

import {v4 as uuidv4} from 'uuid';


export function updatePresentationTitle(presentation: Presentation, title: string): Presentation {
    return {
        ...presentation,
        title: title
    };
}

export function addSlide(presentation: Presentation): Presentation {
    const newSlide = createSlide();
    let newSlideList: SlideList;

    if (presentation.slideList.length === 0) {
        newSlideList = [newSlide];
    } else {
        const lastSelectedSlidePosition = presentation.slideList.findLastIndex(slide => presentation.selection.selectedSlideIds.includes(slide.id));
        newSlideList = presentation.slideList;
        newSlideList.splice(lastSelectedSlidePosition + 1, 0, newSlide);
    }

    return {
        ...presentation,
        slideList: newSlideList,
        selection: {
            selectedSlideIds: [newSlide.id],
            selectedElementIds: []
        }
    };
}

export function removeSlides(presentation: Presentation): Presentation {
    const firstSelectedSlideIdx: number = presentation.slideList.findIndex(slide => presentation.selection.selectedSlideIds.includes(slide.id));
    let newSlides: SlideList = presentation.slideList.filter(slide => !presentation.selection.selectedSlideIds.includes(slide.id));
    let newSlideSelection: string[];

    if (newSlides.length === 0) {
        newSlides = [];
        newSlideSelection = [];
    } else if (firstSelectedSlideIdx <= 0) {
        newSlideSelection = [newSlides[0].id];
    } else {
        newSlideSelection = [newSlides[firstSelectedSlideIdx - 1].id];
    }

    return {
        ...presentation,
        slideList: newSlides,
        selection: {
            selectedSlideIds: newSlideSelection,
            selectedElementIds: []
        }
    }
}

export function changeSlidePosition(presentation: Presentation, newPosition: number): Presentation {
    const newSlides = [...presentation.slideList];
    const firstSelectedSlideIdx: number = presentation.slideList.findIndex(slide => presentation.selection.selectedSlideIds.includes(slide.id));
    const [movedSlide] = newSlides.splice(firstSelectedSlideIdx, 1);
    newSlides.splice(newPosition, 0, movedSlide);


    return {
        ...presentation,
        slideList: newSlides,
        selection: {
            selectedSlideIds: [movedSlide.id],
            selectedElementIds: []
        }
    }
}

export function selectSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        selection: {
            selectedSlideIds: [slideId],
            selectedElementIds: []
        }
    }
}

export function addSlideSelection(presentation: Presentation, newSlideId: string): Presentation {
    let newSlideSelectionList: string[] = presentation.selection.selectedSlideIds.filter(slideId => slideId !== newSlideId);

    if (!newSlideSelectionList.includes(newSlideId)) {
        newSlideSelectionList.unshift(newSlideId);
    }

    return {
        ...presentation,
        selection: {
            selectedSlideIds: newSlideSelectionList,
            selectedElementIds: []
        }
    }
}

export function addTextElement(slide: Slide): Slide {
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

export function addPictureElement(slide: Slide): Slide {
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

export function deleteObjects(slide: Slide, slideElementIds: string[]): Slide {
    return {
        ...slide,
        elements: slide.elements.filter(slideElement => !slideElementIds.includes(slideElement.id))
    };
}

export function changeElementPosition(slide: Slide, slideElementId: string, position: ElementPosition): Slide {
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

export function changeElementSize(slide: Slide, slideElementId: string, size: ElementSize): Slide {
    return {
        ...slide,
        elements: slide.elements.map(slideElement => {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }

            return {
                ...slideElement,
                size
            } as SlideElement;
        })
    };
}

export function changeTextContent(slide: Slide, slideElementId: string, newTextContent: string): Slide {
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

export function changeTextFontSize(slide: Slide, slideElementId: string, newFontSize: number): Slide {
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

export function changeTextFontFamily(slide: Slide, slideElementId: string, newFontFamiy: string): Slide {
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

export function changeTextColor(slide: Slide, slideElementId: string, newTextColor: string): Slide {
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

export function changeSlideBackground(slide: Slide, background: string): Slide {
    return {
        ...slide,
        background: background
    };
}

export function selectElement(presentation: Presentation, newSelectId: string): Presentation {
    return {
        ...presentation,
        selection: {
            ...(this.selection),
            selectedElementIds: [newSelectId]
        }
    }
}

export function addElementSelection(presentation: Presentation, newSelectId: string): Presentation {
    let newElementSelectionList: string[] = presentation.selection.selectedElementIds.filter(elementId => elementId !== newSelectId);

    if (!newElementSelectionList.includes(newSelectId)) {
        newElementSelectionList.unshift(newSelectId);
    }

    return {
        ...presentation,
        selection: {
            ...(this.selection),
            newElementSelectionList: []
        }
    }
}

function createSlide(): Slide {
    return {
        id: generateId(),
        background: '#FFFFFF',
        elements: []
    }
}

function generateId(): string {
    // return `f${(+new Date().getMilliseconds()).toString(16)}`;
    return `f${uuidv4()}`;
}
