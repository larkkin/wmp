/// <reference path="ScalarSensor" />

module Robots {
    export class RangeSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "sonar";
        static friendlyName: string = "Range sensor";
    }
}