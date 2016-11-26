/// <reference path="DeviceImpl" />

module Robots {
    export class Speaker extends DeviceImpl {
        static parentType = DeviceImpl;
        static name: string = "speaker";
        static friendlyName: string = "Speaker";
    }
}