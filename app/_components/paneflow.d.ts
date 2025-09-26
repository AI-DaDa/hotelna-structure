export interface CSSSelector extends String {
}
export interface EventParameters {
    paneChangeStart?: (paneFlow: PaneFlow, data: {
        direction: 'prev' | 'next';
        currentPaneIndex: number;
        newPaneIndex: number;
    }) => void;
    paneChangeEnd?: (paneFlow: PaneFlow, data: {
        direction: 'prev' | 'next';
        currentPaneIndex: number;
        newPaneIndex: number;
    }) => void;
}
export declare enum AnimationType {
    chart = "chart",
    blur = "blur",
    bounce = "bounce",
    'drift-x' = "drift-x",
    'drift-y' = "drift-y",
    drop = "drop",
    fade = "fade",
    twirl = "twirl",
    pop = "pop",
    pulse = "pulse",
    rotate = "rotate",
    spin = "spin",
    stomp = "stomp",
    succession = "succession",
    zoom = "zoom"
}
export interface ChildParameters {
    el: Element | HTMLElement | CSSSelector | null;
    id?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotate?: number | string;
    scale?: number | string;
    transformOrigin?: string;
    opacity?: number;
    parallax?: number;
    width?: number | string;
    height?: number | string;
    textColor?: string;
    bgColor?: string;
    animation?: keyof typeof AnimationType;
}
export interface BlockParameters {
    id?: string;
    el: Element | HTMLElement | CSSSelector;
    col: number;
    row: number;
    widthCols: number;
    heightRows: number;
    enterFrom?: 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left' | 'center';
    exitTo?: 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left' | 'center';
    children?: ChildParameters[];
}
export interface PaneParameters {
    id?: string;
    cols: number;
    rows: number;
    blocks: BlockParameters[];
    autoplayInternal?: number;
}
export type ColorValue = [r: number, g: number, b: number, a: number];
export interface PaginationParameters {
    enabled?: boolean;
    clickable?: boolean;
    type?: 'bullets' | 'thumbs';
}
export interface AutoplayParameters {
    enabled?: boolean;
    interval?: number;
}
export interface NavigationParameters {
    enabled?: boolean;
}
export interface KeyboardControlParameters {
    enabled?: boolean;
}
export interface MousewheelControlParameters {
    enabled?: boolean;
    axis?: 'x' | 'y' | 'both';
}
export interface PaneFlowParameters {
    el: Element | HTMLElement | CSSSelector | null;
    document?: Document;
    panes: PaneParameters[];
    loop?: boolean;
    intro?: boolean;
    blockDelay?: number;
    blockBorderRadius?: number | string;
    transitionDuration?: number;
    gap?: number | string;
    padding?: number | string;
    initialPaneIndex?: number;
    pagination?: PaginationParameters;
    on?: EventParameters;
    autoplay?: AutoplayParameters;
    navigation?: NavigationParameters;
    keyboardControl?: KeyboardControlParameters;
    mousewheelControl?: MousewheelControlParameters;
}
//# sourceMappingURL=types.d.ts.map
export declare const animations: {
    infinite: string[];
    reversible: string[];
    notScalable: string[];
    slow: string[];
};
declare class PaneFlow {
    params: PaneFlowParameters;
    initialized: boolean;
    el: HTMLElement | null;
    currentPaneIndex: number;
    keyboardControl: {
        initialized: boolean;
        onKeyDown: (e: KeyboardEvent) => void;
    };
    mousewheelControl: {
        initialized: boolean;
        onWheel: (e: WheelEvent) => void;
        _lastWheelTime: number;
        _isInertiaScrolling: boolean;
    };
    pagination: {
        el: HTMLElement | null;
        bulletEls: HTMLElement[];
        thumbEls: HTMLElement[];
        onClick: (e: any) => void;
    };
    navigation: {
        prevEl: HTMLElement | null;
        nextEl: HTMLElement | null;
        onClick: (e: any) => void;
    };
    supports: {
        containerQueries: boolean;
    };
    containerSize: number;
    _expectedSlideChangeEndIndexes: number[];
    _autoplayInterval: number | null;
    _transitionEndTimeout: number | null;
    _document: Document;
    _resizeTimeout: number | null;
    _transitionEndListeners: any[];
    constructor(params: PaneFlowParameters);
    emit(event: keyof EventParameters, ...data: any[]): void;
    getBlockEl(el: HTMLElement | CSSSelector | Element): HTMLElement;
    getBlockParamsByEl(paneParams: PaneParameters, blockEl: Element): BlockParameters;
    setBlockCSSVars(paneParams: PaneParameters, blockParamsOrEl: BlockParameters | HTMLElement): void;
    getBlockChildEl(blockEl: HTMLElement, childEl: any): HTMLElement;
    getChildAnimation(blockEl: any, childEl: any): string;
    disableBlockChildrenAnimation(paneParams: PaneParameters, blockEl: HTMLElement): void;
    startBlockChildrenAnimation(paneParams: PaneParameters, blockEl: HTMLElement, stage?: 'enter' | 'entered'): void;
    setBlockChildren(paneParams: PaneParameters, blockParamsOrEl: BlockParameters | HTMLElement, { setParallax, stage, direction }?: {
        setParallax?: boolean;
        stage?: string;
        direction?: string;
    }): void;
    getChildParallaxOffset(blockParams: BlockParameters, stage: string, parallax: number, direction: string): number[];
    setBlockOutTransform(paneParams: PaneParameters, blockParams: BlockParameters, position: string): void;
    getBlockDirection(blockParams: BlockParameters, direction: string, stage: string): "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left" | "center";
    blockEnter(paneParams: PaneParameters, blockParams: BlockParameters, direction: string): void;
    blockExit(paneParams: PaneParameters, blockParams: BlockParameters, direction: string): void;
    withBlockChildren(blockParamsOrBlockEl: BlockParameters | HTMLElement, cb: (subEl: HTMLElement) => void): void;
    getTransitionEndTargetEl({ blocksToEnter, blocksToChange, blocksToExit, direction, currentPaneParams, newPaneParams, }: {
        blocksToEnter: HTMLElement[];
        blocksToChange: HTMLElement[];
        blocksToExit: HTMLElement[];
        direction: string;
        currentPaneParams: PaneParameters;
        newPaneParams: PaneParameters;
    }): HTMLElement;
    prevPane(): void;
    nextPane(): void;
    setPane(newPaneIndex: number, direction?: string): void;
    updatePagination(): void;
    initPaginationThumbs(): void;
    initPaginationBullets(): void;
    initPagination(): void;
    updateNavigation(): void;
    initNavigation(): void;
    initMousewheelControl(): void;
    initKeyboardControl(): void;
    startAutoplay(): void;
    stopAutoplay(): void;
    pauseVideo(blockEl: HTMLElement): void;
    playVideo(blockEl: HTMLElement): void;
    destroy(): void;
    getCQWSize(value: string | number | undefined | null): string | number;
    setContainerCSSVars(): void;
    onResize(): void;
    init(): void;
}
export default PaneFlow;
//# sourceMappingURL=paneflow.d.ts.map