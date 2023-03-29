export interface IBaseRepository<T> {
    create:(t:T)=>Promise<T>
    getAll: () => Promise<T[]>
    getById: (id:string) => Promise<T | null>
    delete:(id:string) => void
    update:(id:string,t:T) => Promise<T | null>
}