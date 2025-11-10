export 
interface UserSessionInterface {
    login: boolean;
    token: string;
    user: {
        name: string;
        email: string;
        address: string;
        phone: string;
        role: string;
        orders:[];
        id: number;
    }
}