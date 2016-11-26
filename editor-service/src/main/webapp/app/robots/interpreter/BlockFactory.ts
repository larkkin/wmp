/// <reference path="Blocks/AbstractBlock.ts" />
/// <reference path="Blocks/ConditionBlock.ts" />
/// <reference path="Blocks/MotorsBlock.ts" />
/// <reference path="Blocks/MotorsDirectionBlock.ts" />
/// <reference path="Blocks/InitialBlock.ts" />
/// <reference path="Blocks/FinalBlock.ts" />
/// <reference path="Blocks/IfBlock.ts" />
/// <reference path="Blocks/FunctionBlock.ts" />
/// <reference path="Blocks/MotorsForwardBlock.ts" />
/// <reference path="Blocks/MotorsBackwardBlock.ts" />
/// <reference path="Blocks/MotorsStopBlock.ts" />
/// <reference path="Blocks/TimerBlock.ts" />
/// <reference path="Blocks/SwitchBlock.ts" />
/// <reference path="Blocks/MarkerUpBlock.ts" />
/// <reference path="Blocks/MarkerDownBlock.ts" />
/// <reference path="Blocks/VariableInitBlock.ts" />
/// <reference path="Blocks/RandomInitBlock.ts" />
/// <reference path="Blocks/EndIfBlock.ts" />
/// <reference path="Blocks/TrikSadSmileBlock.ts" />
/// <reference path="Blocks/TrikSmileBlock.ts" />
/// <reference path="Blocks/TrikSetPainterColorBlock.ts" />
/// <reference path="Blocks/TrikSetPainterWidthBlock.ts" />
/// <reference path="Blocks/TrikDrawEllipseBlock.ts" />
/// <reference path="Blocks/ClearScreenBlock.ts" />
/// <reference path="Blocks/TrikDrawPixelBlock.ts" />
/// <reference path="Blocks/TrikDrawLineBlock.ts" />
/// <reference path="Blocks/TrikDrawRectBlock.ts" />
/// <reference path="Blocks/TrikSetBackgroundBlock.ts" />
/// <reference path="Blocks/PrintTextBlock.ts" />

/// <reference path="Parser.ts" />

module Robots {
    import DiagramNode = EditorCore.DiagramNode;
    import Link = EditorCore.Link;
    export class BlockFactory {

        public createBlock(node: DiagramNode, outboundLinks: Link[], interpreter: Interpreter,
                           robotModels: RobotModel[]): AbstractBlock {
            switch (node.getType()) {
                case "InitialNode":
                    return new InitialBlock(node, outboundLinks);
                case "FinalNode":
                    return new FinalBlock(node, outboundLinks);
                case "IfBlock":
                    return new IfBlock(node, outboundLinks, interpreter);
                case "Function":
                    return new FunctionBlock(node, outboundLinks, interpreter);
                case "TrikV6EnginesForward":
                    return new MotorsForwardBlock(node, outboundLinks, robotModels, interpreter);
                case "TrikV6EnginesBackward":
                    return new MotorsBackwardBlock(node, outboundLinks, robotModels, interpreter);
                case "TrikV6EnginesStop":
                    return new MotorsStopBlock(node, outboundLinks, robotModels);
                case "Timer":
                    return new TimerBlock(node, outboundLinks, interpreter);
                case "SwitchBlock":
                    return new SwitchBlock(node, outboundLinks, interpreter);
                case "MarkerUp":
                    return new MarkerUpBlock(node, outboundLinks, robotModels);
                case "MarkerDown":
                    return new MarkerDownBlock(node, outboundLinks, robotModels);
                case "VariableInit":
                    return new VariableInitBlock(node, outboundLinks, interpreter);
                case "Randomizer":
                    return new RandomInitBlock(node, outboundLinks, interpreter);
                case "FiBlock":
                    return new EndIfBlock(node, outboundLinks);
                case "TrikSadSmile":
                    return new TrikSadSmileBlock(node, outboundLinks, robotModels);
                case "TrikSmile":
                    return new TrikSmileBlock(node, outboundLinks, robotModels);
                case "TrikSetPainterColor":
                    return new TrikSetPainterColorBlock(node, outboundLinks, interpreter);
                case "TrikSetPainterWidth":
                    return new TrikSetPainterWidthBlock(node, outboundLinks, interpreter);
                case "TrikDrawEllipse":
                    return new TrikDrawEllipseBlock(node, outboundLinks, interpreter, robotModels);
                case "ClearScreen":
                    return new ClearScreenBlock(node, outboundLinks, robotModels);
                case "TrikDrawPixel":
                    return new TrikDrawPixelBlock(node, outboundLinks, interpreter, robotModels);
                case "TrikDrawLine":
                    return new TrikDrawLineBlock(node, outboundLinks, interpreter, robotModels);
                case "TrikDrawRect":
                    return new TrikDrawRectBlock(node, outboundLinks, interpreter, robotModels);
                case "TrikSetBackground":
                    return new TrikSetBackgroundBlock(node, outboundLinks, robotModels);
                case "PrintText":
                    return new PrintTextBlock(node, outboundLinks, interpreter, robotModels);
                default:
                    throw new Error("Block " + node.getType() + " is not supported");
            }
        }

    }
}