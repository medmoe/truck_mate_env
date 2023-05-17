
export interface TruckInfo {
    id?:number,
    owner?: number;
    isCreate?: boolean;
    model: string,
    brand: string,
    starting_date: string,
    year: number,
    mileage: number,
    capacity: number,
}
export interface DriverInfo {
    id?:number,
    owner?: number,
    isCreate?: boolean,
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
    owner?: number,
    isCreate?: boolean,
    driver: DriverInfo,
    truck: TruckInfo,
    date: string,
    starting_mileage: number,
    ending_mileage: number,
    starting_quantity: number,
    ending_quantity: number,
    starting_time: string,
    ending_time: string,
}
export interface CostInfo {
    id?: number,
    owner?: number,
    isCreate?: boolean,
    driver: DriverInfo,
    truck: TruckInfo,
    date: string,
    gaz_refill: number,
    maintenance: number,
    description: string,
}

export const NUM_OF_ITEMS_PER_PAGE = 20;
export let API: string = "";
if (process.env.NODE_ENV === 'production') {
    API = 'https://truck-mate.herokuapp.com/';
} else {
    API = 'http://localhost:8000/';
}