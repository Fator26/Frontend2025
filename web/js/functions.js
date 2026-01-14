var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function updatePresentationTitle(presentation, title) {
    return __assign(__assign({}, presentation), { title: title });
}
export function addSlide(presentation) {
    var newSlide = createSlide();
    var newSlideList;
    var newCurrentSlide;
    if (presentation.currentSlide === null) {
        newSlideList = [newSlide];
        newCurrentSlide = 0;
    }
    else {
        newSlideList = presentation.slideList;
        newSlideList.splice(presentation.currentSlide + 1, 0, newSlide);
        newCurrentSlide = presentation.currentSlide + 1;
    }
    return __assign(__assign({}, presentation), { slideList: newSlideList, currentSlide: newCurrentSlide });
}
export function removeSlides(presentation, slideIds) {
    var newSlides = presentation.slideList.filter(function (slide) { return !slideIds.includes(slide.id); });
    var newCurrentSlide = null;
    if (newSlides.length > 0) {
        newCurrentSlide = newSlides.length > (presentation.currentSlide || 0) ? presentation.currentSlide : 0;
    }
    return __assign(__assign({}, presentation), { slideList: newSlides, currentSlide: newCurrentSlide });
}
export function changeSlidePosition(presentation, newPosition) {
    var slides = __spreadArray([], presentation.slideList, true);
    var movedSlide = slides.splice(presentation.currentSlide, 1)[0];
    slides.splice(newPosition, 0, movedSlide);
    return __assign(__assign({}, presentation), { slideList: slides });
}
export function addTextElement(slide) {
    return __assign(__assign({}, slide), { elements: __spreadArray(__spreadArray([], slide.elements, true), [
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
        ], false) });
}
export function addPictureElement(slide) {
    return __assign(__assign({}, slide), { elements: __spreadArray(__spreadArray([], slide.elements, true), [
            {
                id: generateId(),
                type: 'picture',
                src: '../../image/new-image.jpeg',
                position: { x: 100, y: 100 },
                size: { width: 200, height: 100 },
            }
        ], false) });
}
export function deleteObjects(slide, slideElementIds) {
    return __assign(__assign({}, slide), { elements: slide.elements.filter(function (slideElement) { return !slideElementIds.includes(slideElement.id); }) });
}
export function changeElementPosition(slide, slideElementId, position) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { position: position });
        }) });
}
export function changeElementSize(slide, slideElementId, size) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { size: size });
        }) });
}
export function changeTextContent(slide, slideElementId, newTextContent) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { content: newTextContent });
        }) });
}
export function changeTextFontSize(slide, slideElementId, newFontSize) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { fontSize: newFontSize });
        }) });
}
export function changeTextFontFamily(slide, slideElementId, newFontFamiy) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { fontFamily: newFontFamiy });
        }) });
}
export function changeTextColor(slide, slideElementId, newTextColor) {
    return __assign(__assign({}, slide), { elements: slide.elements.map(function (slideElement) {
            if (slideElement.id !== slideElementId) {
                return slideElement;
            }
            return __assign(__assign({}, slideElement), { color: newTextColor });
        }) });
}
export function changeSlideBackground(slide, background) {
    return __assign(__assign({}, slide), { background: background });
}
function createSlide() {
    return {
        id: generateId(),
        background: '#FFFFFF',
        elements: []
    };
}
function generateId() {
    // return `f${(+new Date().getMilliseconds()).toString(16)}`;
    return "f".concat(crypto.randomUUID());
}
