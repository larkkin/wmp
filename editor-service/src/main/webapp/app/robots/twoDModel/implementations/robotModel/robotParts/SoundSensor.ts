/// <reference path="ScalarSensor" />

module Robots {
    export class SoundSensor extends ScalarSensor {
        static parentType = ScalarSensor;
        static name: string = "sound";
        static friendlyName: string = "Sound sensor";
    }
}