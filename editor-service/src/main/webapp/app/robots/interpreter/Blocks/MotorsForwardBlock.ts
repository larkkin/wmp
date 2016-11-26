module Robots {
    import DiagramNode = EditorCore.DiagramNode;
    import Link = EditorCore.Link;
    export class MotorsForwardBlock extends MotorsDirectionBlock {

        constructor(node: DiagramNode, outboundLinks: Link[], robotModels: RobotModel[], interpreter: Interpreter) {
            super(node, outboundLinks, robotModels, interpreter);
        }

        protected getPower(): number {
            return this.getPowerProperty();
        }

    }
}