// Sample array of restaurant food items
const restaurantItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99 },
    { id: 2, name: "Cheeseburger", price: 9.99 },
    { id: 3, name: "Chicken Biryani", price: 8.99 },
    { id: 4, name: "Spaghetti Carbonara", price: 14.99 },
];

// Tool function to get all items
export const getAllItems = () => {
    return restaurantItems;
};

// Tool function to get an item by name
export const getItemByName = (name: string) => {
    return restaurantItems.find(item => item.name.toLowerCase() === name.toLowerCase());
};

// Tool function to get an item by id
export const getItemById = (id: number) => {
    return restaurantItems.find(item => item.id === id);
};

// Tool function to place an order
export const placeOrder = (name: string, quantity: number) => {
    const item = getItemByName(name);
    if (!item) {
        throw new Error("Item not found");
    }
    // Simple order simulation
    const order = {
        orderId: Math.floor(Math.random() * 1000000),
        item,
        quantity,
        total: item.price * quantity,
        status: "confirmed"
    };
    return order;
};