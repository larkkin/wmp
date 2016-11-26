
module Robots {
    import Link = EditorCore.Link;
    export abstract class ConditionBlock extends AbstractBlock {

        protected getGuard(link: Link): string {
            return link.getChangeableProperties()["Guard"].value;
        }

    }
}