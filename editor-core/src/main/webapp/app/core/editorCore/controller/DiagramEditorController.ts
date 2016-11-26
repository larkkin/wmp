/// <reference path="SceneController.ts" />
/// <reference path="PropertyEditorController.ts" />
/// <reference path="loaders/ElementsTypeLoader.ts" />
/// <reference path="PaletteController.ts" />
/// <reference path="parsers/DiagramJsonParser.ts" />
/// <reference path="exporters/DiagramExporter.ts" />
/// <reference path="../model/DiagramEditor.ts" />
/// <reference path="../../../vendor.d.ts" />

module EditorCore {
    export class DiagramEditorController {

        protected diagramEditor: DiagramEditor;
        protected sceneController: SceneController;
        protected propertyEditorController: PropertyEditorController;
        protected elementsTypeLoader: ElementsTypeLoader;
        protected paletteController: PaletteController;
        protected nodeTypesMap: Map<String, NodeType>;
        protected undoRedoController: UndoRedoController;

        constructor($scope, $attrs) {
            this.undoRedoController = new UndoRedoController();
            this.nodeTypesMap = new Map<String, NodeType>();
            this.paletteController = new PaletteController();
            DiagramElementListener.getNodeProperties = (type: string): Map<String, Property> => {
                return this.getNodeProperties(type);
            };
            this.diagramEditor = new DiagramEditor();
            this.sceneController = new SceneController(this, this.diagramEditor.getScene());
            this.elementsTypeLoader = new ElementsTypeLoader();

            $scope.undo = () => {
                this.undoRedoController.undo();
            };

            $scope.redo = () => {
                this.undoRedoController.redo();
            };

            $(document).bind("mousedown", function (e) {
                if (!($(e.target).parents(".custom-menu").length > 0)) {
                    $(".custom-menu").hide(100);
                }
            });
        }

        public getGraph(): joint.dia.Graph {
            return this.diagramEditor.getGraph();
        }

        public getNodesMap(): Map<String, DiagramNode> {
            var paper = this.diagramEditor.getScene();
            return paper.getNodesMap();
        }

        public getLinksMap(): Map<String, Link> {
            var paper = this.diagramEditor.getScene();
            return paper.getLinksMap();
        }

        public setNodeProperties(element: DiagramElement): void {
            this.propertyEditorController.setNodeProperties(element)
        }

        public clearNodeProperties(): void {
            this.propertyEditorController.clearState();
        }

        public getNodeType(type: string): NodeType {
            return this.nodeTypesMap[type];
        }

        public getNodeProperties(type: string): Map<String, Property> {
            return this.nodeTypesMap[type].getPropertiesMap();
        }

        public getUndoRedoController(): UndoRedoController {
            return this.undoRedoController;
        }

        public clearState(): void {
            this.propertyEditorController.clearState();
            this.sceneController.clearState();
            this.diagramEditor.clear();
            this.undoRedoController.clearStack();
        }

        public getDiagramParts(): DiagramParts {
            return new DiagramParts(this.getNodesMap(), this.getLinksMap());
        }

        public getNodeTypes(): Map<String, NodeType> {
            return this.nodeTypesMap;
        }

        public addFromMap(diagramParts: DiagramParts): void {
            var scene = this.diagramEditor.getScene();
            scene.addNodesFromMap(diagramParts.nodesMap);
            scene.addLinksFromMap(diagramParts.linksMap);
        }
    }
}