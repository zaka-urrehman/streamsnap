import { GoogleGenAI, Type } from "@google/genai"
import { getAllItems, getItemByName, getItemById, placeOrder } from "./tools";

const getAllItemsDeclaration = {
    name: 'get_all_items',
    description: 'Retrieves all items from the restaurant menu.',
    // parameters: {
    //     type: Type.OBJECT,
    //     properties: {}
    // }
};

const getItemByNameDeclaration = {
    name: 'get_item_by_name',
    description: 'Retrieves a restaurant food item by its name.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'The name of the food item.'
            }
        },
        required: ['name']
    }
};

const getItemByIdDeclaration = {
    name: 'get_item_by_id',
    description: 'Retrieves a restaurant food item by its id.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            id: {
                type: Type.NUMBER,
                description: 'The id of the food item.'
            }
        },
        required: ['id']
    }
};

const placeOrderDeclaration = {
    name: 'place_order',
    description: 'Places an order for a given food item and quantity.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'The name of the food item to order.'
            },
            quantity: {
                type: Type.NUMBER,
                description: 'The number of items to order.'
            }
        },
        required: ['name', 'quantity']
    }
};

// You can now use these function declarations as part of your AI prompt model
export const toolsDeclarations = [
    getAllItemsDeclaration,
    getItemByNameDeclaration,
    getItemByIdDeclaration,
    placeOrderDeclaration
];

export const toolsEnum: Record<string, Function> = {
    get_all_items: getAllItems,
    get_item_by_name: getItemByName,
    get_item_by_id: getItemById,
    place_order: placeOrder
}
