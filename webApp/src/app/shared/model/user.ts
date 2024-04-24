export interface User {
    id: number;
    name: string;
    email: string;
    country: string;
    DOB: string;
    avatar: {
        base64String: string;
        fileName: string;
    };
}