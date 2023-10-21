export type User = {
    userId: number;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    token?: string;
}