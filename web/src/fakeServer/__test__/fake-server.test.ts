import {BookModel, BookStatus} from "../fake-server"
import FakeServer from '../fake-server'

describe('Fake Server tests', () => {
  beforeEach(() => {
    const fakeServer = FakeServer
    fakeServer.clear()
  })

  const defaultBook: BookModel = {
    id: '1',
    author: 'marcos',
    title: 'Titulo',
    amount: 12,
    status: BookStatus.available
  }

  it('should store a Book', async  () => {
    const fakeServer = FakeServer
    await expect(fakeServer.storeNewBook(defaultBook)).resolves.toBeUndefined()
    await expect(fakeServer.findAllBooks()).resolves.toContain(defaultBook)
   })

  it('should delete a stored book', async () => {
    const fakeServer = FakeServer
    await fakeServer.storeNewBook(defaultBook)
    
    await fakeServer.deleteBook(defaultBook.id)
    await expect(fakeServer.findAllBooks()).resolves.toEqual([])
  })

  it('should find a book by a given id', async () => {
    const fakeServer = FakeServer
    await fakeServer.storeNewBook(defaultBook)

    await expect(fakeServer.findBookById(defaultBook.id))
      .resolves.toEqual(defaultBook)
  })

  it('should update a stored book', async () => {
    const fakeServer = FakeServer  
    await fakeServer.storeNewBook(defaultBook)

    const updatedBook =  {
      title: 'Updated title'
    }

    await expect(fakeServer.updateBook(defaultBook.id, updatedBook))
      .resolves.toEqual({ ...defaultBook, ...updatedBook })
  })
})
