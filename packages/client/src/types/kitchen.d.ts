export type Kitchen = {
    id: string;
    name: string;
    description: string;
    address: string;
    openingHours: { open: string, close: string }
    cuisineType: string;
    deliveryOptions: string;
    paymentOptions: string;
    specialOptions: string;
    contactInfo: string;
    menuIds: string[]
};
