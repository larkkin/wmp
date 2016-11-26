/// <reference path="../../robotParts/ScalarSensor.ts" />

module Robots {
    export class TrikMotionSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name = "motion";
        static friendlyName = "Motion Sensor";
    }
}