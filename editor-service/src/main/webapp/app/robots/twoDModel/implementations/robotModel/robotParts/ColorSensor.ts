/// <reference path="ScalarSensor" />

module Robots {
    export class ColorSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "color";
        static friendlyName: string = "Color sensor";
    }
}