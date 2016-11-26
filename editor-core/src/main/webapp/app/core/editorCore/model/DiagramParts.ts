/// <reference path="DiagramNode.ts" />
/// <reference path="Link.ts" />
/// <reference path="SubprogramDiagramNode.ts" />
/// <reference path="../../../vendor.d.ts" />

module EditorCore {
    export class DiagramParts {

        nodesMap: Map<String, DiagramNode>;
        linksMap: Map<String, Link>;
        subprogramDiagramNodes: SubprogramDiagramNode[] = [];

        constructor(nodesMap?: Map<String, DiagramNode>, linksMap?: Map<String, Link>,
                    subprogramDiagramNodes?: SubprogramDiagramNode[]) {
            this.nodesMap = nodesMap || new Map<String, DiagramNode>();
            this.linksMap = linksMap || new Map<String, Link>();
            this.subprogramDiagramNodes = subprogramDiagramNodes || [];
        }
    }
}