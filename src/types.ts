export type Presentation = {
    id: string,
    title: string,
    slideList: SlideList,
    currentSlide: number | null,
    // сделать нормально на Selection
};

export type SlideList = Slide[];

export type Slide = {
    id: string,
    background: string,
    elements: SlideElement[],
};

export type SlideElement = TextElement | PictureElement;

export type TextElement = {
    id: string,
    type: 'text',
    content: string,
    position: ElementPosition,
    size: ElementSize,
    fontSize: number,
    fontFamily: string,
    color: string,
};

export type PictureElement = {
    id: string,
    type: 'picture',
    src: string,
    position: ElementPosition,
    size: ElementSize,
};

export type ElementPosition = {
    x: number,
    y: number,
};

export type ElementSize = {
    width: number,
    height: number,
};

export type Selection = {
    selectedSlideIds: string[];
    selectedElementIds: string[]
};