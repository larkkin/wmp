package com.qreal.wmp.editor.common.loaders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

@Component
public class TypesLoader {

    private final ObjectMapper mapper;

    public TypesLoader() {
        mapper = new ObjectMapper();
    }

    /** Provides JSON types for client.*/
    public JsonNode getTypesJson(String notation) throws IOException {
        ObjectNode resultTypes = mapper.createObjectNode();

        ClassLoader classLoader = getClass().getClassLoader();
        JsonNode typesList = mapper.readTree(
                new File(classLoader.getResource(notation + "/typesList.json").getFile()));
        JsonNode allTypes = mapper.readTree(
                new File(classLoader.getResource(notation + "/elementsTypes_en.json").getFile()));

        resultTypes.set("elements", getElementsTypes(typesList, allTypes));
        resultTypes.set("blocks", getBlocksTypes(typesList, allTypes));

        return resultTypes;
    }

    private ArrayNode getElementsTypes(JsonNode typesList, JsonNode allTypes) {
        JsonNode listElements = typesList.path("elements");
        JsonNode allElements = allTypes.path("elements");
        return getObjectsWithTypes(listElements, allElements);
    }

    private ObjectNode getBlocksTypes(JsonNode typesList, JsonNode allTypes) {
        ObjectNode resultBlocksNode = mapper.createObjectNode();
        JsonNode listElements = typesList.path("blocks");
        JsonNode allBlocks = allTypes.path("blocks");
        JsonNode categoriesNames = allTypes.path("categoriesNames");
        resultBlocksNode.set("general", getGeneralTypes(listElements, allBlocks));
        resultBlocksNode.set("palette", getPaletteTypes(listElements, allBlocks, categoriesNames));
        return resultBlocksNode;
    }

    private ArrayNode getGeneralTypes(JsonNode listBlocksTypes, JsonNode allBlocksTypes) {
        JsonNode listGeneralTypes = listBlocksTypes.path("general");
        return getObjectsWithTypes(listGeneralTypes, allBlocksTypes);
    }

    private ObjectNode getPaletteTypes(JsonNode listBlocksTypes, JsonNode allBlocksTypes, JsonNode categoriesNames) {
        ObjectNode resultPaletteNode = mapper.createObjectNode();
        JsonNode listPaletteTypes = listBlocksTypes.path("palette");
        Iterator<Map.Entry<String, JsonNode>> categoriesIterator = listPaletteTypes.fields();

        while (categoriesIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = categoriesIterator.next();
            String category = entry.getKey();
            JsonNode taskCategoryNode = listPaletteTypes.path(category);
            ArrayNode categoryArray = getObjectsWithTypes(taskCategoryNode, allBlocksTypes);
            resultPaletteNode.set(categoriesNames.get(category).textValue(), categoryArray);
        }

        return resultPaletteNode;
    }

    private ArrayNode getObjectsWithTypes(JsonNode listNode, JsonNode sourceNode) {
        ArrayNode array = mapper.createArrayNode();
        Iterator<JsonNode> listIterator = listNode.elements();

        while (listIterator.hasNext()) {
            JsonNode type = listIterator.next();
            String typeName = type.textValue();
            JsonNode typeObject = sourceNode.path(typeName);
            ((ObjectNode) typeObject).put("type", typeName);
            array.add(typeObject);
        }

        return array;
    }
}