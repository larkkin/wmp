/// <reference path="PropertiesPack.ts" />
/// <reference path="Property.ts" />

module EditorCore {
    export interface DiagramElement {
        getLogicalId(): string;
        getJointObject();
        getName(): string;
        getType(): string;
        getConstPropertiesPack(): PropertiesPack;
        getChangeableProperties(): Map<String, Property>;
        setProperty(name: string, property: Property): void;
    }
}