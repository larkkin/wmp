/// <reference path="HtmlView.ts" />
/// <reference path="PaletteElementView.ts" />
/// <reference path="../../../core/editorCore/model/NodeType.ts" />
/// <reference path="../../../utils/StringUtils.ts" />

module EditorCore {
    export class CategoryView extends HtmlView {

        private template: string = '' +
            '<li>' +
            '   <p>{0}</p>' +
            '   <ul>{1}</ul>' +
            '</li>';

        constructor(categoryName: string, category: Map<String, NodeType>) {
            super();
            var elementsContent: string = '';
            for (var typeName in category) {
                var nodeType: NodeType = category[typeName];
                var nodeName: string = nodeType.getName();
                var paletteElementView: PaletteElementView = new PaletteElementView(typeName, nodeName, nodeType.getImage());
                elementsContent += paletteElementView.getContent();
            }
            this.content = Utils.StringUtils.format(this.template, categoryName, elementsContent);
        }

    }
}