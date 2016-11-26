/// <reference path="DiagramElement.ts" />

module EditorCore {
    export interface DiagramNode extends DiagramElement {
        getX(): number;
        getY(): number;
        getImagePath(): string;
        setPosition(x: number, y: number, zoom: number): void;
        getPropertyEditElement(): PropertyEditElement;
        initPropertyEditElements(zoom: number): void;
    }
}
