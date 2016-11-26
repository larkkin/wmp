/// <reference path="AbstractItem.ts" />
/// <reference path="../../../../../vendor.d.ts"/>

module Robots {
    export interface WallItem extends AbstractItem {
        getPath(): RaphaelPath;
        updateStart(x: number, y: number): void;
        updateEnd(x: number, y: number): void;
    }
}