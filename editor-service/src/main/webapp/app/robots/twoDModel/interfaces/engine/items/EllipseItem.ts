/// <reference path="ColorFieldItem.ts" />

module Robots {
    export interface EllipseItem extends ColorFieldItem {
        updateCorner(oppositeCornerX: number, oppositeCornerY: number, x: number, y: number): void;
    }
}