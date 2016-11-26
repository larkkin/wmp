/// <reference path="DeviceImpl" />

module Robots {
    export class Display extends DeviceImpl {
        static parentType = DeviceImpl;
        static name: string = "display";
        static friendlyName: string = "Display";
    }
}