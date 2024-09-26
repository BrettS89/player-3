export interface Table {
  name: string
  db?: any

  getById(id: string | number): Promise<Record<string, any> | null>
  find(): Promise<any[]>
  create(data: Record<string, any>): Promise<Record<string, any>>
  findByIdAndUpdate(id: string | number, data: Record<string, any>): Promise<Record<string, any>>
  remove(id: string | number): Promise<Record<string, any>>
}

export abstract class Db {
  abstract connect(connectionString?: string): Promise<void> | void
  abstract table(name: string): Table
}
