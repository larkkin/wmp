/// <reference path="NodeType.ts" />
/// <reference path="PaletteTypes.ts" />

module EditorCore {
    export class ElementTypes {

        uncategorisedTypes: Map<String, NodeType>;
        paletteTypes: PaletteTypes;

        constructor() {
            this.uncategorisedTypes = new Map<String, NodeType>()
            this.paletteTypes = new PaletteTypes();
        }
    }
}