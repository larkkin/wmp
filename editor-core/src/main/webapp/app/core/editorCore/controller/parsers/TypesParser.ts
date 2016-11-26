/// <reference path="../../model/NodeType.ts" />
/// <reference path="../../model/PaletteTypes.ts" />
/// <reference path="../../model/ElementTypes.ts" />
/// <reference path="../../../../common/constants/GeneralConstants.d.ts" />
/// <reference path="../../../../vendor.d.ts" />

module EditorCore {
    export class TypesParser {

        public parse(typesJson: any): ElementTypes {
            var diagramElementTypes: ElementTypes = new ElementTypes();
            var elementsTypesMap: Map<String, NodeType> = this.parseElementsTypes(typesJson.elements);
            var generalTypesMap: Map<String, NodeType> = this.parseGeneralTypes(typesJson.blocks.general);
            diagramElementTypes.uncategorisedTypes = $.extend(elementsTypesMap, generalTypesMap);
            diagramElementTypes.paletteTypes = this.parsePaletteTypes(typesJson.blocks.palette);
            return diagramElementTypes;
        }

        private parseElementsTypes(elementsTypes: any): Map<String, NodeType> {
            var elementsTypesMap: Map<String, NodeType> = new Map<String, NodeType>();

            for (var i in elementsTypes) {
                var typeObject = elementsTypes[i];
                var typeName: string = typeObject.type;

                elementsTypesMap[typeName] = this.createNodeType(typeObject);
            }
            return elementsTypesMap;
        }

        private parseGeneralTypes(generalTypes: any): Map<String, NodeType> {
            var generalTypesMap: Map<String, NodeType> = new Map<String, NodeType>();

            for (var i in generalTypes) {
                var typeObject = generalTypes[i];
                var typeName: string = typeObject.type;
                generalTypesMap[typeName] = this.createNodeType(typeObject);
            }

            return generalTypesMap;
        }

        private parsePaletteTypes(paletteTypes: any): PaletteTypes {
            var paletteTypesObject: PaletteTypes = new PaletteTypes();

            for (var category in paletteTypes) {
                var categoryTypesMap: Map<String, NodeType> = new Map<String, NodeType>();
                for (var i in paletteTypes[category]) {
                    var typeObject = paletteTypes[category][i];
                    var typeName: string = typeObject.type;
                    categoryTypesMap[typeName] = this.createNodeType(typeObject);
                }
                paletteTypesObject.categories[category] = categoryTypesMap;
            }

            return paletteTypesObject;
        }

        private createNodeType(typeObject: any): NodeType {
            var name: string = typeObject.name;
            var typeName: string = typeObject.type;

            var elementTypeProperties: Map<String, Property> = this.parseTypeProperties(typeName, typeObject.properties);

            var imageElement: any = typeObject.image;

            if (imageElement) {
                var image: string = Common.GeneralConstants.APP_ROOT_PATH + imageElement.src;
                return new NodeType(name, elementTypeProperties, image);
            } else {
                return new NodeType(name, elementTypeProperties);
            }
        }

        private parseTypeProperties(typeName: string, propertiesArrayNode: any): Map<String, Property> {
            var properties: Map<String, Property> = new Map<String, Property>();
            for (var i in propertiesArrayNode) {
                var propertyObject = propertiesArrayNode[i];
                var propertyKey: string = propertyObject.key;
                var propertyName: string = propertyObject.name;
                var propertyType: string = propertyObject.type;

                if (propertyType === "dropdown" || propertyType === "combobox" || propertyType === "checkbox") {
                    this.addVariantList(typeName, propertyKey, propertyObject.variants);
                }

                var propertyValue: string = "";
                if (propertyObject.value) {
                    propertyValue = propertyObject.value;
                } else if (propertyObject.selected) {
                    propertyValue = propertyObject.selected.key;
                }

                var property: Property = new Property(propertyName, propertyType, propertyValue);
                properties[propertyKey] = property;
            }
            return properties;
        }

        private addVariantList(typeName: string, propertyKey: string, variantsArrayNode: any): void {
            var variants: Utils.Variant[] = [];
            for (var i in variantsArrayNode) {
                var variant = variantsArrayNode[i];
                variants.push(new Utils.Variant(variant.key, variant.value));
            }
            Utils.VariantMap.addVariantList(typeName, propertyKey, variants);
        }
    }
}