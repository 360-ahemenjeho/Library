let books = [
  { title: 'Harry Potter', author: 'J. K. Rowling', pages: 900, read: false },
  { title: 'Hercules', author: 'Apollodorus', pages: 789, read: true }
]

const addBookFormEl = document.querySelector('#addBookForm')
const bookLayoutEl = document.querySelector('.books .layout')

function Book({ title, author, pages, read }) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleStatus = function (status) {
  this.read = !status
}

function renderBooks() {
  bookLayoutEl.innerHTML = ''

  if (books.length > 0) {
    books.forEach((item, i) => {
      const cardEl = setBook(i, item.title, item.author, item.pages, item.read)
      bookLayoutEl.appendChild(cardEl)
    })
  }
}

function setBook(i, title, author, pages, read) {
  // CHECK IF BOOK ALREADY EXIST
  let cardEl = document.querySelector(`#book__${i}`)

  // If the card doesn't exist, create it
  if (!cardEl) {
    cardEl = document.createElement('div')
    cardEl.setAttribute('id', `book__${i}`)

    // CREATE CHILD ELEMENTS
    const spanEl = document.createElement('span')
    const titleEl = document.createElement('p')
    const authorEl = document.createElement('p')
    const buttonEl = document.createElement('button')
    const iconEl = document.createElement('i')

    // SET INITIAL ATTRIBUTES
    cardEl.setAttribute('class', 'card')
    authorEl.setAttribute('class', 'author')
    titleEl.setAttribute('class', 'title')
    buttonEl.setAttribute('class', read ? 'btn sec' : 'btn pri')
    buttonEl.setAttribute('type', 'button')
    buttonEl.setAttribute('role', 'status')
    iconEl.setAttribute('class', 'ph-fill ph-trash')

    // APPEND CHILD ELEMENTS
    cardEl.appendChild(spanEl)
    cardEl.appendChild(authorEl)
    cardEl.appendChild(titleEl)
    cardEl.appendChild(buttonEl)
    cardEl.appendChild(iconEl)

    // ADD EVENTS
    iconEl.addEventListener('click', () => deleteBook(i))
  }

  // UPDATE VALUES
  const spanEl = cardEl.querySelector('span')
  const titleEl = cardEl.querySelector('.title')
  const authorEl = cardEl.querySelector('.author')
  const buttonEl = cardEl.querySelector('.btn')
  const iconEl = cardEl.querySelector('i')

  spanEl.textContent = `${pages || 0} Pg.`
  authorEl.textContent = author || 'M. Author'
  titleEl.textContent = title || 'Book title'
  buttonEl.textContent = read ? 'Unread 😂' : 'Read 😌'

  return cardEl
}

function deleteBook(i) {
  const filteredBooks = books.filter((_, j) => j !== i)
  books = filteredBooks
  const bookEl = document.querySelector(`#book__${i}`)

  if (bookEl) {
    bookEl.remove()
  }
}

function editBookStatus(i) {}

addBookFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const readStatus = {
    0: true,
    1: false
  }

  let pages = document.querySelector('#pages').value
  let author = document.querySelector('#author').value
  let title = document.querySelector('#title').value

  if (!pages || !author || !title) {
    alert('Fields are required!')
    return
  }

  if (isNaN(pages)) {
    alert('Invalid page data!')
    return
  }

  const read = readStatus[Math.floor(Math.random() * 2)]

  const cardEl = setBook(books.length, title, author, pages)

  books.push({
    title,
    author,
    pages,
    read
  })

  bookLayoutEl.appendChild(cardEl)
  pages = ''
  title = ''
  author = ''
})

renderBooks()
