/// <reference path="WorldModel.ts" />
/// <reference path="RobotModel.ts" />
/// <reference path="Settings.ts" />
/// <reference path="../../../implementations/robotModel/TwoDRobotModel.ts" />

module Robots {
    export interface Model {
        getWorldModel(): WorldModel;
        getRobotModels(): RobotModel[];
        getSetting(): Settings;
        addRobotModel(robotModel: TwoDRobotModel): void;
        deserialize(xml): void;
        getTimeline(): Timeline;
    }
}