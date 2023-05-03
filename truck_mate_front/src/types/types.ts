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
export interface DriverInfo {
    id?:number,
    owner?: number | null,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    address: string,
    phone_number: string,
    starting_date: string,
    ending_date: string,
}
export interface PerformanceInfo {
    id?: number,
    owner?: number | null,
    driver: number,
    truck: number,
    date: string,
    starting_quantity: number,
    ending_quantity: number,
    starting_time: string,
    ending_time: string,
}