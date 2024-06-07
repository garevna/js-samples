var LibraryBook = function (_title = 'Untitled', _year = 'no data', _author = 'no data') {
  var title = _title
  var year = _year
  var author = _author
  var readerName = null
  var readerData = null
  function giveTheBook (client, data = new Date()) {
    readerName = client
    readerData = data
  }
  this.getBookInfo = function () {
    var text = readerName ? 'handed out' : 'are available'
    console.info(`${author}, ${title} (${year}): ${text}`)
  }
  this.getTheBook = function (client, data) {
    if (readerName) {
      this.getBookInfo()
      return null
    } else {
      giveTheBook(client, data)
      return { title, year, author }
    }
  }
  this.returnBook = function () {
    readerName = null
    readerData = null
  }
}

var books = [
  new LibraryBook('Oliver Twist', 1838, 'Charles Dickens'),
  new LibraryBook('Don Juan', 1819, 'Lord Byron'),
  new LibraryBook('Cabbages and Kings', 1904, 'O. Henry'),
]

books[0].getBookInfo()
books[0].getTheBook('Stephan Milly', new Date(2018, 6, 25))
books[0].getBookInfo()
books[0].returnBook()
books[0].getBookInfo()
