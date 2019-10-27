export default interface IModel<T> {
    create: (product: T) => Promise<T>,
    read: (id : string) => Promise<T>,
    update: (id : string, data: Partial<T>) => Promise<T>,
    remove: (id: string) => Promise<string>,
    index: () => Promise<T[]>,
}