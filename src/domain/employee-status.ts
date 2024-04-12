export interface EmployeeStatus {
    id?: string,
    name?: string,
    status_from_to?: {
        status?: string,
        from?: Date,
        to?: Date
    }[],
    statusList?: string 
}