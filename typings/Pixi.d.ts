// Type definitions for Pixi.js v3.0.10
// Project: https://github.com/GoodBoyDigital/pixi.js/
// Definitions by: clark-stevenson <https://github.com/pixijs/pixi-typescript>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module PIXI {

    export class Stage extends Container {
        constructor(a: any, b:any)
    }
    export class AssetLoader {
        constructor(a: any)
        onComplete: any;
        load(): any;
    }

    export var VERSION: string;
    export var PI_2: number;
    export var RAD_TO_DEG: number;
    export var DEG_TO_RAD: number;
    export var TARGET_FPMS: number;
    export var RENDERER_TYPE: {
        UNKNOWN: number;
        WEBGL: number;
        CANVAS: number;
    };
    export var BLEND_MODES: {
        NORMAL: number;
        ADD: number;
        MULTIPLY: number;
        SCREEN: number;
        OVERLAY: number;
        DARKEN: number;
        LIGHTEN: number;
        COLOR_DODGE: number;
        COLOR_BURN: number;
        HARD_LIGHT: number;
        SOFT_LIGHT: number;
        DIFFERENCE: number;
        EXCLUSION: number;
        HUE: number;
        SATURATION: number;
        COLOR: number;
        LUMINOSITY: number;

    };
    export var DRAW_MODES: {
        POINTS: number;
        LINES: number;
        LINE_LOOP: number;
        LINE_STRIP: number;
        TRIANGLES: number;
        TRIANGLE_STRIP: number;
        TRIANGLE_FAN: number;
    };
    export var SCALE_MODES: {
        DEFAULT: number;
        LINEAR: number;
        NEAREST: number;
    };
    export var RETINA_PREFIX: RegExp;
    export var RESOLUTION: number;
    export var FILTER_RESOLUTION: number;
    export var DEFAULT_RENDER_OPTIONS: {
        view: HTMLCanvasElement;
        resolution: number;
        antialias: boolean;
        forceFXAA: boolean;
        autoResize: boolean;
        transparent: boolean;
        backgroundColor: number;
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
        roundPixels: boolean;
    };
    export var SHAPES: {
        POLY: number;
        RECT: number;
        CIRC: number;
        ELIP: number;
        RREC: number;
    };
    export var SPRITE_BATCH_SIZE: number;

    export function autoDetectRenderer(width: number, height: number, options?: PIXI.RendererOptions, noWebGL?: boolean): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    export var loader: PIXI.loaders.Loader;

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////CORE//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    //accessibility
    export class AccessibilityManager {

        protected div: HTMLElement;
        protected pool: HTMLElement[];
        protected renderId: number;
        protected children: DisplayObject[];
        protected isActive: boolean;

        debug: boolean;
        renderer: PIXI.SystemRenderer;

        constructor(renderer: PIXI.SystemRenderer);

        protected activate(): void;
        protected deactivate(): void;
        protected updateAccessibleObjects(displayObject: DisplayObject): void;
        protected update(): void;
        protected capHitArea(hitArea: any): void;
        protected addChild(displayObject: DisplayObject): void;

        destroy(): void;

    }

    export interface AccessibleTarget {

        accessible: boolean;
        accessibleTitle: string;
        accessibleHint: string;
        tabIndex: number;

    }

    //display

    export class DisplayObject extends utils.EventEmitter implements interaction.InteractiveTarget {

        //begin extras.cacheAsBitmap see https://github.com/pixijs/pixi-typescript/commit/1207b7f4752d79a088d6a9a465a3ec799906b1db
        protected _originalRenderWebGL: WebGLRenderer;
        protected _originalRenderCanvas: CanvasRenderer;
        protected _originalUpdateTransform: boolean;
        protected _originalHitTest: any;
        protected _cachedSprite: any;
        protected _originalDestroy: any;

        cacheAsBitmap: boolean;

        protected _renderCachedWebGL(renderer: WebGLRenderer): void;
        protected _initCachedDisplayObject(renderer: WebGLRenderer): void;
        protected _renderCachedCanvas(renderer: CanvasRenderer): void;
        protected _initCachedDisplayObjectCanvas(renderer: CanvasRenderer): void;
        protected _getCachedBounds(): Rectangle;
        protected _destroyCachedDisplayObject(): void;
        protected _cacheAsBitmapDestroy(): void;
        //end extras.cacheAsBitmap

        protected _sr: number;
        protected _cr: number;
        protected _bounds: Rectangle;
        protected _currentBounds: Rectangle;
        protected _mask: Rectangle;
        protected _cachedObject: any;

        updateTransform(): void;

        position: Point;
        scale: Point;
        pivot: Point;
        rotation: number;
        renderable: boolean;
        skew: Point;
        alpha: number;
        visible: boolean;
        parent: Container;
        worldAlpha: number;
        worldTransform: Matrix;
        filterArea: Rectangle;

        x: number;
        y: number;
        worldVisible: boolean;
        mask: Graphics | Sprite;
        filters: AbstractFilter[];
        name: string;

        getBounds(): Rectangle;
        getLocalBounds(): Rectangle;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from?: DisplayObject, to?: Point): Point;
        generateTexture(renderer: CanvasRenderer | WebGLRenderer, scaleMode: number, resolution: number): Texture;
        setParent(container: Container): Container;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, pivotX?: number, pivotY?: number): DisplayObject;
        destroy(): void;
        getGlobalPosition(point: Point): Point;

        interactive: boolean;
        buttonMode: boolean;
        interactiveChildren: boolean;
        defaultCursor: string;
        hitArea: HitArea;
        accessible: boolean;
        accessibleTitle: string;
        tabIndex: number;

        on(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;

        once(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;

    }

    export class Container extends DisplayObject {

        protected _renderWebGL(renderer: WebGLRenderer): void;
        protected _renderCanvas(renderer: CanvasRenderer): void;

        protected onChildrenChange: () => void;

        children: DisplayObject[];

        width: number;
        height: number;

        addChild(...child: DisplayObject[]): DisplayObject;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        getChildIndex(child: DisplayObject): number;
        setChildIndex(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        getChildByName(name: string): DisplayObject;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        destroy(destroyChildren?: boolean): void;
        generateTexture(renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer, resolution?: number, scaleMode?: number): Texture;

        renderWebGL(renderer: WebGLRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;

        once(event: 'added', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: 'removed', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: 'added', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: 'removed', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;

    }

    //graphics

    export class GraphicsData {

        constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: Circle | Rectangle | Ellipse | Polygon);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        fillColor: number;
        fillAlpha: number;
        fill: boolean;
        shape: Circle | Rectangle | Ellipse | Polygon;
        type: number;

        clone(): GraphicsData;

        protected _lineTint: number;
        protected _fillTint: number;

    }
    export class Graphics extends Container {

        protected boundsDirty: boolean;
        protected dirty: boolean;
        protected glDirty: boolean;

        fillAlpha: number;
        lineWidth: number;
        lineColor: number;
        tint: number;
        blendMode: number;
        isMask: boolean;
        boundsPadding: number;

        clone(): Graphics;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;
        beginFill(color: number, alpha?: number): Graphics;
        endFill(): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(path: number[] | Point[]): Graphics;
        clear(): Graphics;
        //todo
        generateTexture(renderer: WebGLRenderer | CanvasRenderer, resolution?: number, scaleMode?: number): Texture;
        getBounds(matrix?: Matrix): Rectangle;
        containsPoint(point: Point): boolean;
        updateLocalBounds(): void;
        drawShape(shape: Circle | Rectangle | Ellipse | Polygon): GraphicsData;

    }
    export class GraphicsRenderer extends ObjectRenderer {
        constructor(renderer: PIXI.WebGLRenderer);

        buildCircle: (graphicsData: PIXI.Graphics, webGLData: Object) => void;
        buildPoly: (graphicsData: PIXI.Graphics, webGLData: Object) => boolean;
        buildRectangle: (graphicsData: PIXI.Graphics, webGLData: Object) => void;
        buildComplexPoly: (graphicsData: PIXI.Graphics, webGLData: Object) => void;
        buildLine: (graphicsData: PIXI.Graphics, webGLData: Object) => void;
        updateGraphics: (graphics: PIXI.Graphics) => void;
        buildRoundedRectangle: (graphicsData: PIXI.Graphics, webGLData: Object) => void;
        quadraticBezierCurve: (fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number, out: any) => number[];
        switchMode: (webGL: WebGLRenderingContext, type: number) => WebGLGraphicsData;
    }
    export class WebGLGraphicsData {
        constructor(gl: WebGLRenderingContext);

        upload: () => void;
        reset: () => void;
        destroy: () => void;
    }

    //math

    export module GroupD8 {
        export function add(rotationSecond: number, rotationFirst: number): number;
        export function byDirection(dx: number, dy: number): number;
        export function inv(rotation: number): number;
        export function isSwapWidthHeight(rotation: number): boolean;
        export function matrixAppendRotationInv(matrix: Matrix, rotation: number, tx: number, ty: number): void;
        export function rotate180(rotation: number): number;
        export function sub(rotationSecond: number, rotationFirst: number): number;
        export function uX(ind: number): number;
        export function uY(ind: number): number;
        export function vX(ind: number): number;
        export function vY(ind: number): number;

        export var E: number;
        export var MIRROR_HORIZONTAL: number;
        export var MIRROR_VERTICAL: number;
        export var N: number;
        export var NE: number;
        export var NW: number;
        export var S: number;
        export var SE: number;
        export var SW: number;
        export var W: number;
    }

    export class Point {

        x: number;
        y: number;

        constructor(x?: number, y?: number);

        clone(): Point;
        copy(p: Point): void;
        equals(p: Point): boolean;
        set(x?: number, y?: number): void;

    }
    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        fromArray(array: number[]): void;
        toArray(transpose?: boolean, out?: number[]): number[];
        apply(pos: Point, newPos?: Point): Point;
        applyInverse(pos: Point, newPos?: Point): Point;
        translate(x: number, y: number): Matrix;
        scale(x: number, y: number): Matrix;
        rotate(angle: number): Matrix;
        append(matrix: Matrix): Matrix;
        prepend(matrix: Matrix): Matrix;
        invert(): Matrix;
        identity(): Matrix;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        setTransform(a: number, b: number, c: number, d: number, sr: number, cr: number, cy: number, sy: number, nsx: number, cs: number): PIXI.Matrix;

        static IDENTITY: Matrix;
        static TEMP_MATRIX: Matrix;

    }

    export interface HitArea {

        contains(x: number, y: number): boolean;

    }

    export class Circle implements HitArea {

        constructor(x?: number, y?: number, radius?: number);

        x: number;
        y: number;
        radius: number;
        type: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Ellipse implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Polygon implements HitArea {

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        closed: boolean;
        points: number[];
        type: number;

        clone(): Polygon;
        contains(x: number, y: number): boolean;


    }
    export class Rectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }
    export class RoundedRectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;
        
        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    }

    //particles

    export interface ParticleContainerProperties {

        scale?: boolean;
        position?: boolean;
        rotation?: boolean;
        uvs?: boolean;
        alpha?: boolean;

    }
    export class ParticleContainer extends Container {

        constructor(size?: number, properties?: ParticleContainerProperties, batchSize?: number);

        protected _maxSize: number;
        protected _batchSize: number;
        protected _properties: boolean[];
        protected _buffers: WebGLBuffer[];
        protected _bufferToUpdate: number;

        protected onChildrenChange: (smallestChildIndex?: number) => void;

        interactiveChildren: boolean;
        blendMode: number;
        roundPixels: boolean;

        setProperties(properties: ParticleContainerProperties): void;

    }
    export interface ParticleBuffer {

        gl: WebGLRenderingContext;
        vertSize: number;
        vertByteSize: number;
        size: number;
        dynamicProperties: any[];
        staticProperties: any[];

        staticStride: number;
        staticBuffer: any;
        staticData: any;
        dynamicStride: number;
        dynamicBuffer: any;
        dynamicData: any;

        initBuffers(): void;
        bind(): void;
        destroy(): void;

    }

    export interface IParticleRendererProperty {
        attribute: number;
        size: number;
        uploadFunction: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
        offset: number;
    }

    export class ParticleRenderer extends ObjectRenderer {
        constructor(renderer: PIXI.WebGLRenderer);

        generateBuffers: (container: PIXI.ParticleContainer) => PIXI.ParticleBuffer[];
        indexBuffer: WebGLBuffer;
        indices: Uint16Array;
        properties: PIXI.IParticleRendererProperty[];
        shader: PIXI.Shader;
        tempMatrix: Matrix;
        uploadAlpha: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
        uploadPosition: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
        uploadRotation: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
        uploadUvs: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
        uploadVertices: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
    }
    export interface ParticleShader {

    }

    //renderers

    export interface RendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        antialias?: boolean;
        resolution?: number;
        clearBeforeRendering?: boolean;
        preserveDrawingBuffer?: boolean;
        forceFXAA?: boolean;
        roundPixels?: boolean;
        backgroundColor?: number;

    }
    export class SystemRenderer extends utils.EventEmitter {

        protected _backgroundColor: number;
        protected _backgroundColorRgb: number[];
        protected _backgroundColorString: string;
        protected _tempDisplayObjectParent: any;
        protected _lastObjectRendered: DisplayObject;

        constructor(system: string, width?: number, height?: number, options?: RendererOptions);

        type: number;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        blendModes: any; //todo?
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        roundPixels: boolean;
        backgroundColor: number;

        render(object: DisplayObject): void;
        resize(width: number, height: number): void;
        destroy(removeView?: boolean): void;

    }
    export class CanvasRenderer extends SystemRenderer {

        protected renderDisplayObject(displayObject: DisplayObject, context: CanvasRenderingContext2D): void;
        protected _mapBlendModes(): void;

        constructor(width?: number, height?: number, options?: RendererOptions);

        context: CanvasRenderingContext2D;
        refresh: boolean;
        maskManager: CanvasMaskManager;
        roundPixels: boolean;
        smoothProperty: string;

        render(object: DisplayObject): void;
        resize(w: number, h: number): void;

    }
    export class CanvasBuffer {

        protected clear(): void;

        constructor(width: number, height: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;

        width: number;
        height: number;

        resize(width: number, height: number): void;
        destroy(): void;

    }
    export module CanvasGraphics {

        export function renderGraphicsMask(graphics: Graphics, context: CanvasRenderingContext2D): void;
        export function updateGraphicsTint(graphics: Graphics): void;

        export function renderGraphics(graphics: Graphics, context: CanvasRenderingContext2D): void;

    }
    export class CanvasMaskManager {

        pushMask(maskData: any, renderer: WebGLRenderer | CanvasRenderer): void;
        popMask(renderer: WebGLRenderer | CanvasRenderer): void;
        destroy(): void;

    }
    export module CanvasTinter {

        export function getTintedTexture(sprite: DisplayObject, color: number): HTMLCanvasElement;
        export function tintWithMultiply(texture: Texture, color: number, canvas: HTMLDivElement): void;
        export function tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        export function tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        export function roundColor(color: number): number;
        export var cacheStepsPerColorChannel: number;
        export var convertTintToImage: boolean;
        export var vanUseMultiply: boolean;
        export var tintMethod: Function;

    }
    export class WebGLRenderer extends SystemRenderer {

        protected _useFXAA: boolean;
        protected _FXAAFilter: FXAAFilter;
        protected _contextOptions: {
            alpha: boolean;
            antiAlias: boolean;
            premultipliedAlpha: boolean;
            stencil: boolean;
            preseveDrawingBuffer: boolean;
        };
        protected _renderTargetStack: RenderTarget[];

        protected _initContext(): void;
        protected _createContext(): void;
        protected handleContextLost: (event: WebGLContextEvent) => void;
        protected _mapGlModes(): void;
        protected _managedTextures: Texture[];

        constructor(width?: number, height?: number, options?: RendererOptions);

        drawCount: number;
        shaderManager: ShaderManager;
        maskManager: MaskManager;
        stencilManager: StencilManager;
        filterManager: FilterManager;
        blendModeManager: BlendModeManager;
        currentRenderTarget: RenderTarget;
        currentRenderer: ObjectRenderer;

        render(object: DisplayObject): void;
        renderDisplayObject(displayObject: DisplayObject, renderTarget: RenderTarget, clear: boolean): void;
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        setRenderTarget(renderTarget: RenderTarget): void;
        updateTexture(texture: BaseTexture | Texture): BaseTexture | Texture;
        destroyTexture(texture: BaseTexture | Texture, _skipRemove?: boolean): void;

    }
    export class AbstractFilter {

        protected vertexSrc: string[];
        protected fragmentSrc: string[];

        constructor(vertexSrc?: string | string[], fragmentSrc?: string | string[], uniforms?: any);

        uniforms: any;

        padding: number;

        getShader(renderer: WebGLRenderer): Shader;
        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget, clear?: boolean): void;
        syncUniform(uniform: WebGLUniformLocation): void;

    }
    export class SpriteMaskFilter extends AbstractFilter {

        constructor(sprite: Sprite);

        maskSprite: Sprite;
        maskMatrix: Matrix;

        applyFilter(renderer: WebGLRenderbuffer, input: RenderTarget, output: RenderTarget): void;
        map: Texture;
        offset: Point;

    }
    export class FXAAFilter extends AbstractFilter {

        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget): void;

    }
    export class BlendModeManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        setBlendMode(blendMode: number): boolean;

    }

    export class FilterManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        filterStack: any[];
        renderer: WebGLRenderer;
        texturePool: any[];

        onContextChange: () => void;
        setFilterStack(filterStack: any[]): void;
        pushFilter(target: RenderTarget, filters: any[]): void;
        popFilter(): AbstractFilter;
        getRenderTarget(clear?: boolean): RenderTarget;
        protected returnRenderTarget(renderTarget: RenderTarget): void;
        applyFilter(shader: Shader | AbstractFilter, inputTarget: RenderTarget, outputTarget: RenderTarget, clear?: boolean): void;
        calculateMappedMatrix(filterArea: Rectangle, sprite: Sprite, outputMatrix?: Matrix): Matrix;
        capFilterArea(filterArea: Rectangle): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }

    export class MaskManager extends WebGLManager {

        stencilStack: StencilMaskStack;
        reverse: boolean;
        count: number;
        alphaMaskPool: any[];

        pushMask(target: RenderTarget, maskData: any): void;
        popMask(target: RenderTarget, maskData: any): void;
        pushSpriteMask(target: RenderTarget, maskData: any): void;
        popSpriteMask(): void;
        pushStencilMask(target: RenderTarget, maskData: any): void;
        popStencilMask(target: RenderTarget, maskData: any): void;

    }
    export class ShaderManager extends WebGLManager {

        protected _currentId: number;
        protected currentShader: Shader;

        constructor(renderer: WebGLRenderer);

        maxAttibs: number;
        attribState: any[];
        tempAttribState: any[];
        stack: any[];

        setAttribs(attribs: any[]): void;
        setShader(shader: Shader): boolean;
        destroy(): void;

    }
    export class StencilManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        setMaskStack(stencilMaskStack: StencilMaskStack): void;
        pushStencil(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        bindGraphics(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        popStencil(graphics: Graphics, webGLData: WebGLGraphicsData): void;
        destroy(): void;
        pushMask(maskData: any[]): void;
        popMask(maskData: any[]): void;

    }
    export class WebGLManager {

        protected onContextChange: () => void;

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;

        destroy(): void;

    }
    export class Shader {

        protected attributes: any;
        protected textureCount: number;
        protected uniforms: any;

        protected _glCompile(type: any, src: any): Shader;

        constructor(shaderManager: ShaderManager, vertexSrc: string, fragmentSrc: string, uniforms: any, attributes: any);

        uid: number;
        gl: WebGLRenderingContext;
        shaderManager: ShaderManager;
        program: WebGLProgram;
        vertexSrc: string;
        fragmentSrc: string;

        init(): void;
        cacheUniformLocations(keys: string[]): void;
        cacheAttributeLocations(keys: string[]): void;
        compile(): WebGLProgram;
        syncUniform(uniform: any): void;
        syncUniforms(): void;
        initSampler2D(uniform: any): void;
        destroy(): void;

    }
    export class ComplexPrimitiveShader extends Shader {

        constructor(shaderManager: ShaderManager);

    }
    export class PrimitiveShader extends Shader {

        constructor(shaderManager: ShaderManager);

    }
    export class TextureShader extends Shader {

        constructor(shaderManager: ShaderManager, vertexSrc?: string, fragmentSrc?: string, customUniforms?: any, customAttributes?: any);

    }
    export interface StencilMaskStack {

        stencilStack: any[];
        reverse: boolean;
        count: number;

    }
    export class ObjectRenderer extends WebGLManager {

        start(): void;
        stop(): void;
        flush(): void;
        render(object?: any): void;

    }
    export class RenderTarget {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number, resolution: number, root: boolean);

        gl: WebGLRenderingContext;
        frameBuffer: WebGLFramebuffer;
        texture: Texture;
        size: Rectangle;
        resolution: number;
        projectionMatrix: Matrix;
        transform: Matrix;
        frame: Rectangle;
        stencilBuffer: WebGLRenderbuffer;
        stencilMaskStack: StencilMaskStack;
        filterStack: any[];
        scaleMode: number;
        root: boolean;

        clear(bind?: boolean): void;
        attachStencilBuffer(): void;
        activate(): void;
        calculateProjection(protectionFrame: Matrix): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }
    export interface Quad {

        gl: WebGLRenderingContext;
        vertices: number[];
        uvs: number[];
        colors: number[];
        indices: number[];
        vertexBuffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;

        map(rect: Rectangle, rect2: Rectangle): void;
        upload(): void;
        destroy(): void;

    }

    //sprites

    export class Sprite extends Container {

        static fromFrame(frameId: string): Sprite;
        static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

        protected _texture: Texture;
        protected _width: number;
        protected _height: number;
        protected cachedTint: number;

        protected _onTextureUpdate(): void;

        constructor(texture?: Texture);

        anchor: Point;
        tint: number;
        blendMode: number;
        shader: Shader | AbstractFilter;
        texture: Texture;

        width: number;
        height: number;

        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        containsPoint(point: Point): boolean;
        destroy(destroyTexture?: boolean, destroyBaseTexture?: boolean): void;

    }
    export class SpriteRenderer extends ObjectRenderer {

        protected renderBatch(texture: Texture, size: number, startIndex: number): void;

        vertSize: number;
        vertByteSize: number;
        size: number;
        vertices: number[];
        positions: number[];
        colors: number[];
        indices: number[];
        currentBatchSize: number;
        sprites: Sprite[];
        shader: Shader | AbstractFilter;

        render(sprite: Sprite): void;
        flush(): void;
        start(): void;
        destroy(): void;

    }

    //text

    export interface TextStyle {

        font?: string;
        fill?: string | number | CanvasGradient | CanvasPattern;
        align?: string;
        stroke?: string | number;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        letterSpacing?: number;
        breakWords?: boolean;
        lineHeight?: number;
        dropShadow?: boolean;
        dropShadowColor?: string | number;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        dropShadowBlur?: number;
        padding?: number;
        textBaseline?: string;
        lineJoin?: string;
        miterLimit?: number;

    }
    export class Text extends Sprite {

        static fontPropertiesCache: any;
        static fontPropertiesCanvas: HTMLCanvasElement;
        static fontPropertiesContext: CanvasRenderingContext2D;

        protected _text: string;
        protected _style: TextStyle;

        protected updateText(): void;
        protected updateTexture(): void;
        protected drawLetterSpacing(text: string, x: number, y: number, isStroke: boolean): void;
        protected determineFontProperties(fontStyle: TextStyle): TextStyle;
        protected wordWrap(text: string): boolean;

        constructor(text?: string, style?: TextStyle, resolution?: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        dirty: boolean;
        resolution: number;
        text: string;
        style: TextStyle;

        width: number;
        height: number;

    }

    //textures

    export class BaseTexture extends utils.EventEmitter {

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): BaseTexture;

        protected _glTextures: any;

        protected _sourceLoaded(): void;

        constructor(source: HTMLImageElement | HTMLCanvasElement, scaleMode?: number, resolution?: number);

        uuid: number;
        resolution: number;
        width: number;
        height: number;
        realWidth: number;
        realHeight: number;
        scaleMode: number;
        hasLoaded: boolean;
        isLoading: boolean;
        source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        premultipliedAlpha: boolean;
        imageUrl: string;
        isPowerOfTwo: boolean;
        mipmap: boolean;

        update(): void;
        loadSource(source: HTMLImageElement | HTMLCanvasElement): void;
        destroy(): void;
        dispose(): void;
        updateSourceImage(newSrc: string): void;

        on(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;

        once(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class RenderTexture extends Texture {

        protected renderWebGL(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean, updateTransform?: boolean): void;
        protected renderCanvas(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean, updateTransform?: boolean): void;

        constructor(renderer: CanvasRenderer | WebGLRenderer, width?: number, height?: number, scaleMode?: number, resolution?: number);

        width: number;
        height: number;
        resolution: number;
        renderer: CanvasRenderer | WebGLRenderer;
        valid: boolean;

        render(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean, updateTransform?: boolean): void;
        resize(width: number, height: number, updateBase?: boolean): void;
        clear(): void;
        destroy(): void;
        getImage(): HTMLImageElement;
        getPixels(): number[];
        getPixel(x: number, y: number): number[];
        getBase64(): string;
        getCanvas(): HTMLCanvasElement;

    }
    export class Texture extends utils.EventEmitter {

        static fromImage(imageUrl: string, crossOrigin?: boolean, scaleMode?: number): Texture;
        static fromFrame(frameId: string): Texture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): Texture;
        static fromVideo(video: HTMLVideoElement | string, scaleMode?: number): Texture;
        static fromVideoUrl(videoUrl: string, scaleMode?: number): Texture;
        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;
        static EMPTY: Texture;

        protected _frame: Rectangle;
        protected _uvs: TextureUvs;

        protected onBaseTextureUpdated(baseTexture: BaseTexture): void;
        protected onBaseTextureLoaded(baseTexture: BaseTexture): void;
        protected _updateUvs(): void;

        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle, rotate?: number);

        noFrame: boolean;
        baseTexture: BaseTexture;
        trim: Rectangle;
        valid: boolean;
        requiresUpdate: boolean;
        width: number;
        height: number;
        crop: Rectangle;
        rotate: number;

        frame: Rectangle;

        update(): void;
        destroy(destroyBase?: boolean): void;
        clone(): Texture;

    }
    export class TextureUvs {

        x0: number;
        y0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;

        protected set(frame: Rectangle, baseFrame: Rectangle, rotate: number): void;

    }
    export class VideoBaseTexture extends BaseTexture {

        static fromVideo(video: HTMLVideoElement, scaleMode?: number): VideoBaseTexture;
        static fromUrl(videoSrc: string | any | string[] | any[]): VideoBaseTexture;

        protected _loaded: boolean;
        protected _onUpdate(): void;
        protected _onPlayStart(): void;
        protected _onPlayStop(): void;
        protected _onCanPlay(): void;

        constructor(source: HTMLVideoElement, scaleMode?: number);

        autoUpdate: boolean;

        destroy(): void;

    }

    //utils

    export module utils {

        export function uuid(): number;
        export function hex2rgb(hex: number, out?: number[]): number[];
        export function hex2string(hex: number): string;
        export function rgb2hex(rgb: Number[]): number;
        export function canUseNewCanvasBlendModes(): boolean;
        export function getNextPowerOfTwo(number: number): number;
        export function isPowerOfTwo(width: number, height: number): boolean;
        export function getResolutionOfUrl(url: string): number;
        export function sayHello(type: string): void;
        export function isWebGLSupported(): boolean;
        export function sign(n: number): number;
        export function removeItems<T>(arr: T[], startIdx: number, removeCount: number): void;
        export var TextureCache: any;
        export var BaseTextureCache: any;

        //https://github.com/primus/eventemitter3
        export class EventEmitter {

            listeners(event: string): Function[];
            emit(event: string, ...args: any[]): boolean;
            on(event: string, fn: Function, context?: any): EventEmitter;
            once(event: string, fn: Function, context?: any): EventEmitter;
            removeListener(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            removeAllListeners(event: string): EventEmitter;

            off(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            addListener(event: string, fn: Function, context?: any): EventEmitter;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRAS////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module extras {

        export interface BitmapTextStyle {

            font?: string | {

                name?: string;
                size?: number;

            };
            align?: string;
            tint?: number;

        }
        export class BitmapText extends Container {

            static fonts: any;

            protected _glyphs: Sprite[];
            protected _font: string | {
                tint: number;
                align: string;
                name: string;
                size: number;
            };
            protected _text: string;

            protected updateText(): void;

            constructor(text: string, style?: BitmapTextStyle);

            textWidth: number;
            textHeight: number;
            maxWidth: number;
            maxLineHeight: number;
            dirty: boolean;

            tint: number;
            align: string;
            font: string | {
                tint: number;
                align: string;
                name: string;
                size: number;
            };
            text: string;

        }
        export class MovieClip extends Sprite {

            static fromFrames(frame: string[]): MovieClip;
            static fromImages(images: string[]): MovieClip;

            protected _textures: Texture[];
            protected _durations: number[];
            protected _currentTime: number;

            protected update(deltaTime: number): void;

            constructor(textures: Texture[] | { texture: Texture, time?: number }[]);

            animationSpeed: number;
            loop: boolean;
            onComplete: () => void;
            currentFrame: number;
            playing: boolean;

            totalFrames: number;
            textures: Texture[] | { texture: Texture, time?: number }[];

            stop(): void;
            play(): void;
            gotoAndStop(frameName: number): void;
            gotoAndPlay(frameName: number): void;
            destroy(): void;

        }
        export class TilingSprite extends Sprite {

            //This is really unclean but is the only way :(
            //See http://stackoverflow.com/questions/29593905/typescript-declaration-extending-class-with-static-method/29595798#29595798
            //Thanks bas!
            static fromFrame(frameId: string): Sprite;
            static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

            static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;
            static fromImage(imageId: string, width?: number, height?: number, crossorigin?: boolean, scaleMode?: number): TilingSprite;

            protected _tileScaleOffset: Point;
            protected _tilingTexture: boolean;
            protected _refreshTexture: boolean;
            protected _uvs: TextureUvs[];

            constructor(texture: Texture, width: number, height: number);

            tileScale: Point;
            tilePosition: Point;

            width: number;
            height: number;
            originalTexture: Texture;

            getBounds(): Rectangle;
            generateTilingTexture(renderer: WebGLRenderer | CanvasRenderer, texture: Texture, forcePowerOfTwo?: boolean): Texture;
            containsPoint(point: Point): boolean;
            destroy(): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////FILTERS////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    module filters {

        export class AsciiFilter extends AbstractFilter {
            size: number;
        }
        export class BloomFilter extends AbstractFilter {

            blur: number;
            blurX: number;
            blurY: number;

        }
        export class BlurFilter extends AbstractFilter {

            protected blurXFilter: BlurXFilter;
            protected blurYFilter: BlurYFilter;

            blur: number;
            passes: number;
            blurX: number;
            blurY: number;

        }
        export class BlurXFilter extends AbstractFilter {

            passes: number;
            strength: number;
            blur: number;

        }
        export class BlurYFilter extends AbstractFilter {

            passes: number;
            strength: number;
            blur: number;

        }
        export class SmartBlurFilter extends AbstractFilter {

        }
        export class ColorMatrixFilter extends AbstractFilter {

            protected _loadMatrix(matrix: number[], multiply: boolean): void;
            protected _multiply(out: number[], a: number[], b: number[]): void;
            protected _colorMatrix(matrix: number[]): void;

            matrix: number[];

            brightness(b: number, multiply?: boolean): void;
            greyscale(scale: number, multiply?: boolean): void;
            blackAndWhite(multiply?: boolean): void;
            hue(rotation: number, multiply?: boolean): void;
            contrast(amount: number, multiply?: boolean): void;
            saturate(amount: number, multiply?: boolean): void;
            desaturate(multiply?: boolean): void;
            negative(multiply?: boolean): void;
            sepia(multiply?: boolean): void;
            technicolor(multiply?: boolean): void;
            polaroid(multiply?: boolean): void;
            toBGR(multiply?: boolean): void;
            kodachrome(multiply?: boolean): void;
            browni(multiply?: boolean): void;
            vintage(multiply?: boolean): void;
            colorTone(desaturation: number, toned: number, lightColor: string, darkColor: string, multiply?: boolean): void;
            night(intensity: number, multiply?: boolean): void;
            predator(amount: number, multiply?: boolean): void;
            lsd(multiply?: boolean): void;
            reset(): void;

        }
        export class ColorStepFilter extends AbstractFilter {

            step: number;

        }
        export class ConvolutionFilter extends AbstractFilter {

            constructor(matrix: number[], width: number, height: number);

            matrix: number[];
            width: number;
            height: number;

        }
        export class CrossHatchFilter extends AbstractFilter {

        }
        export class DisplacementFilter extends AbstractFilter {

            constructor(sprite: Sprite, scale?: number);

            map: Texture;

            scale: Point;

        }
        export class DotScreenFilter extends AbstractFilter {

            scale: number;
            angle: number;

        }
        export class BlurYTintFilter extends AbstractFilter {

            blur: number;

        }
        export class DropShadowFilter extends AbstractFilter {

            blur: number;
            blurX: number;
            blurY: number;
            color: number;
            alpha: number;
            distance: number;
            angle: number;

        }
        export class GrayFilter extends AbstractFilter {

            gray: number;

        }
        export class InvertFilter extends AbstractFilter {

            invert: number;

        }
        export class NoiseFilter extends AbstractFilter {

            noise: number;

        }
        export class PixelateFilter extends AbstractFilter {

            size: Point;

        }
        export class RGBSplitFilter extends AbstractFilter {

            red: Point;
            green: Point;
            blue: Point;

        }
        export class SepiaFilter extends AbstractFilter {

            sepia: number;

        }
        export class ShockwaveFilter extends AbstractFilter {

            center: number[];
            params: any;
            time: number;

        }
        export class TiltShiftAxisFilter extends AbstractFilter {

            blur: number;
            gradientBlur: number;
            start: number;
            end: number;

            updateDelta(): void;

        }
        export class TiltShiftFilter extends AbstractFilter {

            blur: number;
            gradientBlur: number;
            start: number;
            end: number;

        }
        export class TiltShiftXFilter extends AbstractFilter {

            updateDelta(): void;

        }
        export class TiltShiftYFilter extends AbstractFilter {

            updateDelta(): void;

        }
        export class TwistFilter extends AbstractFilter {

            offset: Point;
            radius: number;
            angle: number;

        }
    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////INTERACTION///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module interaction {

        export interface InteractionEvent {

            stopped: boolean;
            target: any;
            type: string;
            data: InteractionData;
            stopPropagation(): void;

        }

        export class InteractionData {

            global: Point;
            target: DisplayObject;
            originalEvent: Event;

            getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

        }

        export class InteractionManager {

            protected interactionDOMElement: HTMLElement;
            protected eventsAdded: boolean;
            protected moveWhenInside: boolean;
            protected _tempPoint: Point;

            protected setTargetElement(element: HTMLElement, resolution: number): void;
            protected addEvents(): void;
            protected removeEvents(): void;
            protected dispatchEvent(displayObject: DisplayObject, eventString: string, eventData: any): void;
            protected onMouseDown: (event: Event) => void;
            protected processMouseDown: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseUp: (event: Event) => void;
            protected processMouseUp: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseMove: (event: Event) => void;
            protected processMouseMove: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseOut: (event: Event) => void;
            protected processMouseOverOut: (displayObject: DisplayObject, hit: boolean) => void;
            protected onTouchStart: (event: Event) => void;
            protected processTouchStart: (DisplayObject: DisplayObject, hit: boolean) => void;
            protected onTouchEnd: (event: Event) => void;
            protected processTouchEnd: (displayObject: DisplayObject, hit: boolean) => void;
            protected onTouchMove: (event: Event) => void;
            protected processTouchMove: (displayObject: DisplayObject, hit: boolean) => void;
            protected getTouchData(touchEvent: InteractionData): InteractionData;
            protected returnTouchData(touchData: InteractionData): void;

            constructor(renderer: CanvasRenderer | WebGLRenderer, options?: { autoPreventDefault?: boolean; interactionFrequence?: number; });

            renderer: CanvasRenderer | WebGLRenderer;
            autoPreventDefault: boolean;
            interactionFrequency: number;
            mouse: InteractionData;
            eventData: {
                stopped: boolean;
                target: any;
                type: any;
                data: InteractionData;
            };
            interactiveDataPool: InteractionData[];
            last: number;
            currentCursorStyle: string;
            resolution: number;
            update(deltaTime: number): void;

            mapPositionToPoint(point: Point, x: number, y: number): void;
            processInteractive(point: Point, displayObject: DisplayObject, func: (displayObject: DisplayObject, hit: boolean) => void, hitTest: boolean, interactive: boolean): boolean;
            destroy(): void;

        }

        export interface InteractiveTarget {

            interactive: boolean;
            buttonMode: boolean;
            interactiveChildren: boolean;
            defaultCursor: string;
            hitArea: HitArea;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////LOADER/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //extends
    //https://github.com/englercj/resource-loader/
    //1.6.4

    export module loaders {

        export interface LoaderOptions {

            crossOrigin?: boolean | string;
            loadType?: number;
            xhrType?: string;
            metaData?: any;

        }

        export interface ResourceDictionary {

            [index: string]: PIXI.loaders.Resource;

        }

        export class Loader extends utils.EventEmitter{

            protected static _pixiMiddleware: Function[];
            static addPixiMiddleware(fn: Function): void;

            constructor(baseUrl?: string, concurrency?: number);

            baseUrl: string;
            progress: number;
            loading: boolean;
            resources: ResourceDictionary;

            add(name: string, url: string, options?: LoaderOptions, cb?: () => void): Loader;
            add(url: string, options?: LoaderOptions, cb?: () => void): Loader;
            //todo I am not sure of object literal notional (or its options) so just allowing any but would love to improve this
            add(obj: any, options?: LoaderOptions, cb?: () => void): Loader;

            on(event: 'complete', fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            on(event: 'error', fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'load', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'progress', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'start', fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            on(event: string, fn: Function, context?: any): utils.EventEmitter;

            once(event: 'complete', fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            once(event: 'error', fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'load', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'progress', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'start', fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            once(event: string, fn: Function, context?: any): utils.EventEmitter;

            before(fn: Function): Loader;
            pre(fn: Function): Loader;

            after(fn: Function): Loader;
            use(fn: Function): Loader;

            reset(): void;

            load(cb?: (loader: loaders.Loader, object: any) => void): Loader;

        }

        export interface TextureDictionary {
            [index: string]: PIXI.Texture;
        }

        export class Resource extends utils.EventEmitter {

            static LOAD_TYPE: {
                XHR: number;
                IMAGE: number;
                AUDIO: number;
                VIDEO: number;
            };

            static XHR_READ_STATE: {
                UNSENT: number;
                OPENED: number;
                HEADERS_RECIEVED: number;
                LOADING: number;
                DONE: number;
            };

            static XHR_RESPONSE_TYPE: {
                DEFAULT: number;
                BUFFER: number;
                BLOB: number;
                DOCUMENT: number;
                JSON: number;
                TEXT: number;
            };

            constructor(name?: string, url?: string | string[], options?: LoaderOptions);

            name: string;
            texture: Texture;
            textures: TextureDictionary;
            url: string;
            data: any;
            crossOrigin: boolean | string;
            loadType: number;
            xhrType: string;
            error: Error;
            xhr: XMLHttpRequest;
            SVGMetadataElement: any;

            complete(): void;
            load(cb?: () => void): void;

        }
    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////MESH///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module mesh {

        export class Mesh extends Container {

            static DRAW_MODES: {
                TRIANGLE_MESH: number;
                TRIANGLES: number;
            };

            constructor(texture: Texture, vertices?: number[], uvs?: number[], indices?: number[], drawMode?: number);

            texture: Texture;
            uvs: number[];
            vertices: number[];
            indices: number[];
            dirty: boolean;
            blendMode: number;
            canvasPadding: number;
            drawMode: number;
            shader: Shader | AbstractFilter;

            getBounds(matrix?: Matrix): Rectangle;
            containsPoint(point: Point): boolean;

            protected _texture: Texture;

            protected _renderCanvasTriangleMesh(context: CanvasRenderingContext2D): void;
            protected _renderCanvasTriangles(context: CanvasRenderingContext2D): void;
            protected _renderCanvasDrawTriangle(context: CanvasRenderingContext2D, vertices: number, uvs: number, index0: number, index1: number, index2: number): void;
            protected renderMeshFlat(Mesh: Mesh): void;
            protected _onTextureUpdate(): void;

        }
        export class Rope extends Mesh {

            protected _ready: boolean;

            protected getTextureUvs(): TextureUvs;

            constructor(texture: Texture, points: Point[]);

            points: Point[];
            colors: number[];

            refresh(): void;

        }
        export class Plane extends Mesh {

            segmentsX: number;
            segmentsY: number;

            constructor(texture: Texture, segmentsX?: number, segmentsY?: number);

        }


        export class MeshRenderer extends ObjectRenderer {

            protected _initWebGL(mesh: Mesh): void;

            indices: number[];

            constructor(renderer: WebGLRenderer);

            render(mesh: Mesh): void;
            flush(): void;
            start(): void;
            destroy(): void;

        }

        export interface MeshShader extends Shader { }

    }

    module ticker {

        export var shared: Ticker;

        export class Ticker {

            protected _tick(time: number): void;
            protected _emitter: utils.EventEmitter;
            protected _requestId: number;
            protected _maxElapsedMS: number;

            protected _requestIfNeeded(): void;
            protected _cancelIfNeeded(): void;
            protected _startIfPossible(): void;

            autoStart: boolean;
            deltaTime: number;
            elapsedMS: number;
            lastTime: number;
            speed: number;
            started: boolean;

            FPS: number;
            minFPS: number;

            add(fn: (deltaTime: number) => void, context?: any): Ticker;
            addOnce(fn: (deltaTime: number) => void, context?: any): Ticker;
            remove(fn: (deltaTime: number) => void, context?: any): Ticker;
            start(): void;
            stop(): void;
            update(): void;

        }

    }
}

declare module 'pixi.js' {
    export = PIXI;
}