/// <reference path="vendor.d.ts" />

declare class Interpreter {
    
    public interpret(graph: joint.dia.Graph, nodesMap: Map<String, EditorCore.DiagramNode>,
                     linksMap: Map<String, EditorCore.Link>, timeline: Timeline);
    public stop(): void;

}