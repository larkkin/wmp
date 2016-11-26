module Common {
    export class Diagram {

        private id: number;
        private name: string;

        public static createFromDAO(diagram: TDiagram) {
            return new Diagram(diagram.id, diagram.name)
        }

        constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
        }

        public setId(id: number): void {
            this.id = id;
        }

        public getId(): number {
            return this.id;
        }

        public setName(name: string): void {
            this.name = name;
        }

        public getName(): string {
            return this.name;
        }

    }
}