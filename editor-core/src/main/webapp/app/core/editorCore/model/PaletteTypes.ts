/// <reference path="NodeType.ts" />

module EditorCore {
    export class PaletteTypes {

        categories: Map<String, Map<String, NodeType>>;

        constructor() {
            this.categories = new Map<String, Map<String, NodeType>>()
        }
    }
}