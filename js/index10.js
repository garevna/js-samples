var LibraryBook = function ( _title = "Без названия", _year = "нет данных", _author = "нет данных" ) {
        var title = _title
        var year = _year
        var author = _author
        var readerName = null
        var readerData = null
        function giveTheBook ( client, data = new Date() ) {
                readerName = client
                readerData = data
        }
        this.getBookInfo = function () {
                var text = readerName ? "выдана на руки" : "есть в наличии"
                console.info ( `${author}, ${title} (${year}): ${text}` )
        }
        this.getTheBook = function ( client, data ) {
                if ( readerName ) {
                        this.getBookInfo ()
                        return null
                } else {
                        giveTheBook ( client, data )
                        return {
                                title: title,
                                year: year,
                                author: author
                        }
                }
        }
        this.returnBook = function () {
                readerName = null
                readerData = null
        }
}

var books = []
books [0] = new LibraryBook ( "Война и мир", "1995", "Лев Толстой" )
books [1] = new LibraryBook ( "Отцы и дети", "1998", "Тургенев" )
books [3] = new LibraryBook ( "Кобзарь", "2005", "Тарас Шевченко" )
