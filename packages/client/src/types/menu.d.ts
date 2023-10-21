export type Menu = {
    id: string;
    name: string;
    articleIds: string[];
    kitchenId: string;
};

export type FutureMenu = {
    name: string;
    articleIds: string[];
    kitchenId;
};