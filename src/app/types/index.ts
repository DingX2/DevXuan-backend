export interface UserModel {
    id: number;
    name: string;
}

export interface PostModel {
    id: number;
    title: string;
    subtitle: string;
    writeDate: string;
    content: string;
    image?: string;
}

export interface PostAddModel {
    title: string;
    content: string;
}
