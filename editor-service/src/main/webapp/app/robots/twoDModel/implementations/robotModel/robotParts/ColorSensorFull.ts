/// <reference path="ColorSensor" />

module Robots {
    export class ColorSensorFull extends ColorSensor {
        static parentType = ColorSensor;
        static name: string = "colorRecognition";
        static friendlyName: string = "Color sensor (full)";
    }
}