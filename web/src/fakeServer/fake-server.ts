export interface BookModel {
  id: string
  author: string  
  title: string
  amount: number
  status: string
}

interface IAsyncOperation<T> {
  delay?: number    
  action: () => T
 }

class FakeServer {
  public  books: BookModel[] = []

  private async asyncOperation<T = any>({
    delay = 350,
    action
  }: IAsyncOperation<T>): Promise<T> {
    const data = action(); 
    return new Promise((resolve) => setTimeout(() => resolve(data), delay))
  }

  public clear(): void {
    this.books = []
  } 


  public async  findAllBooks(): Promise<BookModel[]> {
    return await this.asyncOperation<BookModel[]>({
      action: () => this.books
    })
  }

  public async findBookById(id: string): Promise<BookModel | undefined> {
    return this.asyncOperation<BookModel | undefined>({
      action: () => this.books.find(book => book.id === id)
    })
  }

  public async storeNewBook(data: BookModel): Promise<void> {
    return this.asyncOperation({
      action: () => { this.books = [...this.books, data] }
    })
  }

  public async updateBook(
    id: string,
    data: Partial<BookModel>
  ): Promise<Partial<BookModel> | undefined> {
    return this.asyncOperation<Partial<BookModel> | undefined>({
      action: () => {
        const item = this.books.find(i => i.id === id)
        if (!item) return
        const itemsList = this.books.filter(i => i.id !== id)
        const updatedItem = { ...item, ...data }
        this.books = [...itemsList, updatedItem ]
        return updatedItem 
      }
    })
  }

  public async deleteBook(id: string): Promise<void> {
    return this.asyncOperation({
      action: () => { this.books = this.books.filter(book => book.id !== id) }
    })
  }
}

export default new FakeServer()
