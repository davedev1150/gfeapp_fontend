export interface Project {
    id: number;
    projectname?: string;
    attribute?: string;
    ridnum?: number
    ftp_username?: string
    ftp_password?: string
    Code: string,
    lat: number,
    long: number,
    lot: number,
    lodecode: string,
    created_at?: Date;
    updated_at?: Date;
    file?: any;
    file_obj?: URL | string;
}