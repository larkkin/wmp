/// <reference path="vendor.d.ts" />

declare module Utils {
    class UIDGenerator {
        static generate(): string;
    }
}

declare module EditorCore {
    class PropertiesPack {

        logical: Map<String, Property>;
        graphical: Map<String, Property>;

        constructor(logical: Map<String, Property>, graphical: Map<String, Property>);

    }

    class Link implements DiagramElement {

        constructor(jointObject: joint.dia.Link, properties: Map<String, Property>);

        getLogicalId(): string;

        getJointObject(): any;

        getName(): string;

        getType(): string;

        getConstPropertiesPack(): PropertiesPack;

        getChangeableProperties(): Map<String, Property>;

        setProperty(key: string, property: Property): void;

    }

    interface DiagramElement {

        getLogicalId(): string;
        getJointObject();
        getName(): string;
        getType(): string;
        getConstPropertiesPack(): PropertiesPack;
        getChangeableProperties(): Map<String, Property>;
        setProperty(name: string, property: Property): void;

    }

    interface DiagramNode extends DiagramElement {

        getX(): number;
        getY(): number;
        getImagePath(): string;
        setPosition(x: number, y: number, zoom: number): void;
        getChangeableProperties(): Map<String, Property>;
        initPropertyEditElements(zoom: number): void;

    }

    class SubprogramDiagramNode {

        constructor(logicalId: string, name: string);

        getLogicalId(): string;

        getName(): string;

        getType(): string;

        getProperties(): Map<String, Property>;

    }

    class RobotsDiagramNode {

        constructor(logicalId: string, graphicalId: string, properties: Map<String, Property>);

        getLogicalId(): string;

        getGraphicalId(): string;

        getName(): string;

        getType(): string;

        getProperties(): Map<String, Property>;

    }

    class PropertyEditElement {

        constructor(logicalId: string, jointObjectId: string, propertyKey: string, property: Property);

        public getHtmlElement();

        public setPosition(x: number, y: number): void;

    }

    class DefaultDiagramNode implements DiagramNode {

        constructor(name: string, type: string, x: number, y: number, properties: Map<String, Property>, imagePath: string,
                    id?: string, notDefaultConstProperties?: PropertiesPack);

        getLogicalId(): string;

        getJointObject(): any;

        getName(): string;

        getType(): string;

        getConstPropertiesPack(): PropertiesPack;

        getChangeableProperties(): Map<String, Property>;

        setProperty(key: string, property: Property): void;

        getImagePath(): string;

        getX(): number;

        getY(): number;

        setPosition(x: number, y: number): void;

        getChangeableProperties(): Map<String, Property>;

        initPropertyEditElements(zoom: number): void;

        getPropertyEditElement(): PropertyEditElement
    }

    class NodeType {

        constructor(name: string, propertiesMap: Map<String, Property>, image?: string);

        getName(): string;

        getPropertiesMap(): Map<String, Property>;

        getImage(): string;

    }

    class Property {

        name: string;
        type: string;
        value: string;

        constructor(name: string, type: string, value: string);
    }

    class SubprogramNode extends DefaultDiagramNode {

        constructor(name: string, type: string, x: number, y: number, properties: Map<String, Property>, imagePath: string,
                    subprogramDiagramId: string, id?: string, notDefaultConstProperties?: PropertiesPack);

        getSubprogramDiagramId(): string;

        getTextObject(): joint.shapes.basic.Text;

    }

    class DiagramScene {

        constructor(graph: joint.dia.Graph);

        public getId(): string;

        public getGridSize(): number;

        public getZoom(): number;

        public getNodesMap(): Map<String, DiagramNode>;

        public getLinksMap(): Map<String, Link>;

        public getNodeById(id: string): DiagramNode;

        public getLinkById(id: string): Link;

        public addNodesFromMap(nodesMap: Map<String, DiagramNode>): void;

        public addLinksFromMap(linksMap: Map<String, Link>): void;

        public addLinkToMap(linkId: string, linkObject: Link): void;

        public addLinkToScene(link: Link): void;

        public removeNode(nodeId: string): void;

        public removeLink(linkId: string): void;

        public clear(): void;

        public createDefaultNode(name: string, type: string, x: number, y: number, properties: Map<String, Property>,
                                 imagePath: string, id?: string): DiagramNode;

        public createSubprogramNode(name: string, type: string, x: number, y: number, properties: Map<String, Property>,
                                    imagePath: string, subprogramDiagramId: string, id?: string): SubprogramNode;

    }

    class PaletteTypes {
        categories: Map<String, Map<String, NodeType>>;
    }

    class ElementTypes {
        uncategorisedTypes: Map<String, NodeType>;
        paletteTypes: PaletteTypes;
    }

    class DiagramParts {

        nodesMap: Map<String, DiagramNode>;
        linksMap: Map<String, Link>;
        robotsDiagramNode: RobotsDiagramNode;
        subprogramDiagramNodes: SubprogramDiagramNode[];

        constructor(nodesMap?: Map<String, DiagramNode>, linksMap?: Map<String, Link>, robotsDiagramNode?: RobotsDiagramNode,
                    subprogramDiagramNodes?: SubprogramDiagramNode[]);

    }

    class DiagramEditor {

        constructor();

        public getGraph(): joint.dia.Graph;

        public getScene(): DiagramScene;

        public clear(): void;

    }

    interface Command {

        execute(): void;
        revert(): void;
        isRevertible(): boolean;

    }

    class UndoRedoController {

        public addCommand(command: Command);

        public undo(): void;

        public redo(): void;

        public clearStack(): void;

        public bindKeyboardHandler();

        public unbindKeyboardHandler();

    }

    class HtmlView {

        protected content: string;

        public getContent(): string;

    }

    class SubprogramPaletteView extends HtmlView {
        constructor(subprogramDiagramNodes: SubprogramDiagramNode[], subprogramImageSrc: string);
    }

    class BlocksPaletteView extends HtmlView {
        constructor(paletteTypes: PaletteTypes);
    }

    class CategoryView extends HtmlView {
        constructor(categoryName: string, category: Map<String, NodeType>);
    }

    class CheckboxPropertyView extends HtmlView {
        constructor(typeName: string, propertyKey: string, property: Property);
    }

    class DropdownPropertyView extends HtmlView {
        constructor(typeName: string, propertyKey: string, property: Property);
    }

    class PaletteElementView extends HtmlView {
        constructor(typeName: string, name: string, imageSrc: string);
    }

    class SpinnerPropertyView extends HtmlView {
        constructor(propertyKey: string, property: Property);
    }

    class StringPropertyView extends HtmlView {
        constructor(propertyKey: string, property: Property);
    }

    class SubprogramPaletteElementView extends HtmlView {
        constructor(typeName: string, name: string, imageSrc: string, nodeLogicalId: string);
    }

    abstract class DiagramEditorController {

        protected scope: ng.IScope;
        protected diagramEditor: DiagramEditor;
        protected sceneController: SceneController;
        protected propertyEditorController: PropertyEditorController;
        protected elementsTypeLoader: ElementsTypeLoader;
        protected paletteController: PaletteController;
        protected nodeTypesMap: Map<String, NodeType>;
        protected undoRedoController: UndoRedoController;

        constructor($scope, $attrs);

        public getGraph(): joint.dia.Graph;

        public getNodesMap(): Map<String, DiagramNode>;

        public getLinksMap(): Map<String, Link>;

        public setNodeProperties(element: DiagramElement): void;

        public clearNodeProperties(): void;

        public getNodeType(type: string): NodeType;

        public getNodeProperties(type: string): Map<String, Property>;

        public clearState(): void;

        public getDiagramParts(): DiagramParts;

        public getNodeTypes(): Map<String, NodeType>;

        public addFromMap(diagramParts: DiagramParts): void;

    }

    class SceneController {

        protected scene: DiagramScene;
        protected rightClickFlag: boolean;

        constructor(diagramEditorController: DiagramEditorController, scene: DiagramScene);

        public getCurrentElement(): DiagramElement;

        public clearState(): void;

        public createLink(sourceId: string, targetId: string): void;

        public createNode(type: string, x: number, y: number, subprogramId?: string, subprogramName?: string): void;

        public createNodeInEventPositionFromNames(names: string[], event): void;

        public createLinkBetweenCurrentAndEventTargetElements(event): void;

        public setCurrentElement(element: DiagramElement): void;

        public addNode(node: DiagramNode): void;

        public removeElement(element: DiagramElement): void;

        public addLink(link: Link): void;

        public changeCurrentElement(element: DiagramElement): void;

    }

    class PropertyEditorController {

        constructor(sceneController: SceneController, undoRedoController: UndoRedoController);

        public setNodeProperties(element: DiagramElement): void;

        public clearState(): void;

        public setProperty(key: string, value: string): void;

        public changeHtmlElementValue(id: string, value: string): void;

        public changeCheckboxHtml(id: string, value: string): void;

    }

    class PropertyViewFactory {

        public createView(typeName: string, propertyKey: string, property: Property): HtmlView;

    }

    class ElementsTypeLoader {

        load(callback: (elementTypes: ElementTypes) => void, kit?: string, task?: string): void;

    }

    class PaletteController {

        public initDraggable(): void;

        public appendSubprogramsPalette(subprogramDiagramNodes: SubprogramDiagramNode[],
                                        nodeTypesMap: Map<String, NodeType>): void;

        public appendBlocksPalette(paletteTypes: PaletteTypes): void;

    }

    class DiagramJsonParser {

        public parse(diagramJson: any, nodeTypesMap: Map<String, NodeType>): DiagramParts;

        protected findMinPosition(diagramJson: any, nodeTypesMap: Map<String, NodeType>): {x: number; y: number};

        protected parseNodes(diagramJson: any, nodeTypesMap: Map<String, NodeType>, offsetX: number, offsetY: number): DiagramParts;

        protected parseRobotsDiagramNode(nodeObject: any): RobotsDiagramNode;

        protected parseSubprogramDiagram(nodeObject: any): SubprogramDiagramNode;

        protected parseDiagramNodeObject(nodeObject: any, nodeTypesMap: Map<String, NodeType>,
                                         offsetX: number, offsetY: number): DiagramNode;

        protected parseLinks(diagramJson: any, offsetX: number, offsetY: number): Map<String, Link>;

        protected parseLinkObject(linkObject: any, offsetX: number, offsetY: number): Link;

        protected parseVertices(configuration: string);

        protected getSourcePosition(configuration: string);

        protected getTargetPosition(configuration: string);

        protected parsePosition(position: string): {x: number; y: number};

        protected parseId(idString: string): string;

    }

    class DiagramExporter {

        public exportDiagramStateToJSON(graph: joint.dia.Graph, diagramParts: DiagramParts);

        protected exportRobotsDiagramNode(diagramParts: DiagramParts);

        protected exportNodes(graph: joint.dia.Graph, diagramParts: DiagramParts);

        protected exportLinks(diagramParts: DiagramParts);

        protected exportProperties(properties: Map<String, Property>);

        protected exportVertices(vertices): string;

    }

    class DiagramElementListener {
        static getNodeProperties: (type: string) => Map<String, Property>;
    }
}