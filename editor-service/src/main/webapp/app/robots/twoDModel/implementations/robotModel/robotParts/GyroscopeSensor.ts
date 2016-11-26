/// <reference path="ScalarSensor" />

module Robots {
    export class GyroscopeSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "gyroscope";
        static friendlyName: string = "Gyroscope";
    }
}