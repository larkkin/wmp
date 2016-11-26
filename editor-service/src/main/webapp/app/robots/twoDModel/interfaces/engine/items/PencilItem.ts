/// <reference path="ColorFieldItem.ts" />

module Robots {
    export interface PencilItem extends ColorFieldItem {
        updatePath(x: number, y: number): void
    }
}