/// <reference path="./Variant.ts" />

/** Two dimensional map<(String, String), Variant[]>.*/
class VariantMap {

    private static variantsMap = {};

    static addVariantList(typeName: string, propertyKey: string, variants: Variant[]) {
        if (!this.variantsMap[typeName]) {
            this.variantsMap[typeName] = {};
        }
        this.variantsMap[typeName][propertyKey] = variants;
    }

    static getVariantList(typeName: string, propertyKey: string): Variant[] {
        return this.variantsMap[typeName][propertyKey];
    }
}