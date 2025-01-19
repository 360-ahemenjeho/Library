const books = [
  { title: 'Harry Potter', author: 'J. K. Rowling', pages: 900, read: false },
  { title: 'Hercules', author: 'Apollodorus', pages: 789, read: true }
]

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
  const bookLayoutEl = document.querySelector('.books .layout')
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

renderBooks()
