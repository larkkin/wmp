/// <reference path="PortInfo.ts" />
/// <reference path="DeviceInfo.ts" />

module Robots {
    export interface RobotModelInterface {
        getAvailablePorts(): PortInfo[];
        getConfigurablePorts(): PortInfo[];
        getAllowedDevices(port: PortInfo): DeviceInfo[];
    }
}