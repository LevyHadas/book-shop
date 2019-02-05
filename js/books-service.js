
'use strict';

var gBooks
var gNextId = 0
const BOOKS_KEY = 'books'
const LOREM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quisquam consequatur minima, temporibus labore officia? Iure, eaque. Inventore voluptates vel aliquid corporis delectus commodi temporibus expedita, voluptatem fuga, cum incidunt?'


var gSortOrder = 1
var gSortBy = 'id'
var currPageIdx = 1

function addBooks() {
    var books = loadFromStorage(BOOKS_KEY)
    if (!books || books.length === 0) {
        var titles = ['Oh, the Places You\'ll Go!', 'Where the Wild Things Are', 
                'The Complete Tales of Winnie-The-Pooh', 'Charlotte\'s Web', 'The Phantom Tollbooth',
                'The Lion, the Witch and the Wardrobe (The Chronicles of Narnia)']
        var books = titles.map(function(title){
            var price = Math.floor(Math.random()*50)
            var rate = Math.floor(Math.random()*10)
            return createBook(title, price, rate)
        })
    }
    saveToStorage(BOOKS_KEY, books)    
    gBooks = books
}

function createBook(title, price, rate, desc = LOREM) {
    gNextId++
    var book = {id: gNextId,
            title: title,
            price: price,
            rate: rate,
            desc: desc,
            img: `imgs/${gNextId}.jpg`
    }
    return book

}


function getBookById(id) {
    var book = gBooks.find(function(book){
        return book.id === +id 
    })
    return book
}

function add(title, price, rate, desc) {
    var book = createBook(title, price, rate, desc)
    gBooks.push(book)
    saveToStorage(BOOKS_KEY, gBooks)    
}

function read(id) {
    var book = getBookById(id)
    return book
}


function update(id, newPrice, newRate, newDesc) {
    var book = getBookById(id)
    book.price = newPrice
    book.rate = newRate
    book.desc = newDesc
    saveToStorage(BOOKS_KEY, gBooks)    
}

function deleteBook(id) {
    var bookIdx = gBooks.findIndex(function(book){
        return (book.id === +id)
    })
    gBooks.splice(bookIdx,1)
    saveToStorage(BOOKS_KEY, gBooks)    
}


function getBooksToShow() {
    var books = gBooks.slice()
    sortByProperty(books, gSortBy)
    //return splice() of only items to this page
    return gBooks
}


function setSortBy(property) {
    gSortOrder = (gSortBy === property) ? -gSortOrder : gSortOrder 
    gSortBy = property
}

function sortByProperty (arr, property) {  
    arr.sort(function(a,b){
        if (property !== 'title') return gSortOrder * (a[property] - (b[property]))
        else return gSortOrder * a[property].localeCompare(b[property])
    })
}