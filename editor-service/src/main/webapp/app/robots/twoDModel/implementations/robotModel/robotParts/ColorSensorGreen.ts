/// <reference path="ColorSensor" />

module Robots {
    export class ColorSensorGreen extends ColorSensor {
        static parentType = ColorSensor;
        static name: string = "colorGreen";
        static friendlyName: string = "Color sensor (green)";
    }
}