export default interface IModel<T> {
    create: (product: T) => T,
    read: (id : string) => T,
    update: (id : string, data: Partial<T>) => Promise<T>,
    remove: (id: string) => void,
    index: () => Promise<T[]>,
}