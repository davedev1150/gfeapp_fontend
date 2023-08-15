export interface Product {
    id?: number;
    name: string;
    image?: string;
    sn?: string
    description?: string
    instype_id?: string
    procategory_id?: string
    project_id?: number
    stock: number;
    created_at?: Date;
    updated_at?: Date;
    file?: any;
    file_obj?: URL | string;
}