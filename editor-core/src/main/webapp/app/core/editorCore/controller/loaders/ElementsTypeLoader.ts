/// <reference path="../../model/ElementTypes.ts" />
/// <reference path="../parsers/TypesParser.ts" />
/// <reference path="../../../../common/constants/GeneralConstants.d.ts" />
/// <reference path="../../../../vendor.d.ts" />

module EditorCore {
    export class ElementsTypeLoader {

        load(callback: (elementTypes: ElementTypes) => void, kit?: string, task?: string): void {
            var typesParser: TypesParser = new TypesParser();

            $.ajax({
                type: 'POST',
                url: 'getTypes/' + ((task) ? task : ""),
                dataType: 'json',
                data: {
                    'kit': ((kit) ? kit : Common.GeneralConstants.DEFAULT_KIT)
                },
                success: (response) => {
                    callback(typesParser.parse(response));
                },
                error: function (response, status, error) {
                    alert("Element types loading error: " + status + " " + error);
                }
            });
        }

    }
}