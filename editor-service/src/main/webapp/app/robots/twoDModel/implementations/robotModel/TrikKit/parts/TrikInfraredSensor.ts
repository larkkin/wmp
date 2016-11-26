/// <reference path="../../robotParts/RangeSensor.ts" />

module Robots {
    export class TrikInfraredSensor extends RangeSensor {
        static parentType = RangeSensor;
        static name = "infrared";
        static friendlyName = "Infrared Sensor";
    }
}