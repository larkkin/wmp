/// <reference path="../../robotParts/ScalarSensor.ts" />

module Robots {
    export class TrikGamepadConnectionIndicator extends ScalarSensor {
        static parentType = ScalarSensor;
        static name = "gamepadConnectionIndicator";
        static friendlyName = "Android Gamepad Connection Indicator";
    }
}