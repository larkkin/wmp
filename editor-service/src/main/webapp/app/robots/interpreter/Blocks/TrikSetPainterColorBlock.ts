module Robots {
    import DiagramNode = EditorCore.DiagramNode;
    import Link = EditorCore.Link;
    export class TrikSetPainterColorBlock extends AbstractBlock {

        private interpreter: Interpreter;
        private EXPECTED_NUMBER_OF_OUTBOUND_LINKS = 1;

        constructor(node: DiagramNode, outboundLinks: Link[], interpreter: Interpreter) {
            super(node, outboundLinks);
            this.interpreter = interpreter;
        }

        public run(): void {
            var output = this.node.getName();
            +"\n";
            this.checkExpectedNumberOfOutboundLinks(this.EXPECTED_NUMBER_OF_OUTBOUND_LINKS);

            var color: string = this.node.getChangeableProperties()["Color"].value;
            this.interpreter.addOrChangeEnvironmentVariable("painterColor", color);

            console.log(output);
        }

        public getNextNodeId(): string {
            return this.outboundLinks[0].getJointObject().get('target').id;
        }

    }
}