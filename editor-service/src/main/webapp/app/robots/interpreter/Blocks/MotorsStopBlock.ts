module Robots {
    import DiagramNode = EditorCore.DiagramNode;
    import Link = EditorCore.Link;
    export class MotorsStopBlock extends MotorsBlock {

        constructor(node: DiagramNode, outboundLinks: Link[], robotModels: RobotModel[]) {
            super(node, outboundLinks, robotModels);
        }

        protected getPower(): number {
            return 0;
        }

    }
}