/// <reference path="PropertiesPack.ts" />
/// <reference path="../../../utils/structures/map/Map.ts" />
/// <reference path="Property.ts" />

interface DiagramElement {
    getLogicalId(): string;
    getJointObject();
    getName(): string;
    getType(): string;
    getConstPropertiesPack(): PropertiesPack;
    getChangeableProperties(): Map<Property>;
    setProperty(name: string, property: Property): void;
}