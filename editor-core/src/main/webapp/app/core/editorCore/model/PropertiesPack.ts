/// <reference path="Property.ts" />

module EditorCore {
    export class PropertiesPack {

        logical: Map<String, Property>;
        graphical: Map<String, Property>;

        constructor(logical: Map<String, Property>, graphical: Map<String, Property>) {
            this.logical = logical;
            this.graphical = graphical;
        }
    }
}