export interface UserModel {
    id: number;
    name: string;
}

export interface PostModel {
    id: number;
    title: string;
    content: string;
}

export interface PostAddModel {
    title: string;
    content: string;
}
