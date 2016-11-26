/// <reference path="ScalarSensor" />

module Robots {
    export class Button extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "button";
        static friendlyName: string = "Button";
    }
}