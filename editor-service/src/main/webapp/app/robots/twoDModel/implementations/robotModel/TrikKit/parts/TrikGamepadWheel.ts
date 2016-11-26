/// <reference path="../../robotParts/ScalarSensor.ts" />

module Robots {
    export class TrikGamepadWheel extends ScalarSensor {
        static parentType = ScalarSensor;
        static name = "gamepadWheel";
        static friendlyName = "Android Gamepad Wheel";
    }
}