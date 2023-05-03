export interface TruckInfo {
    id?:number,
    owner?: number | null;
    model: string,
    brand: string,
    starting_date: string,
    year: number,
    mileage: number,
    capacity: number,
}