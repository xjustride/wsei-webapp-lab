export interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed";
    createdAt?: string;
    updatedAt?: string | null;
}