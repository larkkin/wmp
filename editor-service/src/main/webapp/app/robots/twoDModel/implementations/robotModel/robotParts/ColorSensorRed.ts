/// <reference path="ColorSensor" />

module Robots {
    export class ColorSensorRed extends ColorSensor {
        static parentType = ColorSensor;
        static name: string = "colorRed";
        static friendlyName: string = "Color sensor (red)";
    }
}