/// <reference path="ScalarSensor" />

module Robots {
    export class TouchSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "touch";
        static friendlyName: string = "Touch sensor";
    }
}