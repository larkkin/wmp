/// <reference path="HtmlView.ts" />
/// <reference path="CategoryView.ts" />
/// <reference path="../../../core/editorCore/model/NodeType.ts" />

module EditorCore {
    export class BlocksPaletteView extends HtmlView {

        constructor(paletteTypes: PaletteTypes) {
            super();
            var categories: Map<String, Map<String, NodeType>> = paletteTypes.categories;
            for (var categoryName in categories) {
                var category: Map<String, NodeType> = categories[categoryName];
                var categoryView = new CategoryView(categoryName, category);
                this.content += categoryView.getContent();
            }
        }

    }
}