/// <reference path="Property.ts" />
/// <reference path="../../../vendor.d.ts" />

module EditorCore {
    export class NodeType {

        private name: string;
        private propertiesMap: Map<String, Property>;
        private image: string;

        constructor(name: string, propertiesMap: Map<String, Property>, image?: string) {
            this.name = name;
            this.propertiesMap = propertiesMap;
            this.image = (image) ? image : null;
        }

        public getName(): string {
            return this.name;
        }

        public getPropertiesMap(): Map<String, Property> {
            return this.propertiesMap;
        }

        public getImage(): string {
            return this.image;
        }

    }
}