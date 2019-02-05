
'use strict';
const READ = 'read'
const UPDATE = 'update'
const DELETE = 'delete'

function init() {
    addBooks()
    renderBooksTable()
}

function renderBooksTable() {
    var books = getBooksToShow()
    var strHtmls = books.map(function(book){
        var actionsContainer = getActionsContainer(book.id)
        var strHtml = `<tr id="${book.id}">
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.price}</td>
                        <td>${actionsContainer}</td>
                        </tr>`
        return strHtml
    }) 
    var strHtml = strHtmls.join('')
    $('tbody.items').html(strHtml)
}

function getActionsContainer(id) {
    var strHtml =  `<span>
                        <button class="btn btn-outline-info" id="${id}" value="read" onclick="onRead(this)">Read</button>
                        <button class="btn btn-outline-success" id="${id}" value="update" onclick="onUpdateRequest(this)">Update</button>
                        <button class="btn btn-outline-danger id="${id}" value="delete" onclick="onDelete(this)">Delete</button>
                    </span>`
    return strHtml
}


function onAddRequest() {
    $('#add-book-modal').modal()
}


function onAddSave() {
    var title = $('.title-value').val()
    var price = $('.price-value').val()
    var rate = $('.rate-value').val()
    if (typeof(price) === 'number' && typeof(rate) === 'number') {
        price = +price
        rate = +rate
    }
    //else give warning and redo onAddRequest
    var desc = $('.desc-value').val()
    add (title, price, rate, desc) 
    renderBooksTable()
}


function onRead(elButton) {
    var book = read(elButton.id)
    renderDetailsModal(book)
}

function renderDetailsModal(book) {
    var $readModal = $('#read-update-modal')
    // Show Title:
    $readModal.find('.modal-title').text(book.title)
    // Show Price
    $readModal.find('.price-value').text(book.price)
    // Show Rating - when clicked enables Save Changes button.
    $readModal.find('.rate-value').text(book.rate)
    // Show Description
    $readModal.find('.desc-value').text(book.desc)
    // Render Save Changes button with the book id. Disabled by Defualt.
    $readModal.find('.save-button-container button').attr('disabled','disabled')
    $readModal.find('.save-button-container button').on('click',function(){onUpdateSave(+book.id)})
    ///this is one option. I could also render the complete button HTML and set onclick="onUpdateSave(${book.id})"
    //in this situation i will need to render the button again in update, so i though this is better.
    
    // Show the modal
    $readModal.modal()
}


function onUpdateRequest(elButton) {
    var book = getBookById(elButton.id)
    renderUpdateModal(book)
}


function renderUpdateModal(book) {

    var $updateModal = $('#read-update-modal')
    // Show update Title input:
    $updateModal.find('.modal-title').text(book.title)
    // Show update Price input:
    $updateModal.find('.price-value').html(`<input class="price-value-update" value="${book.price}"</input>`)
    // Show update Rate input:
    $updateModal.find('.rate-value').text(+book.rate)
    // Show Image:
    $updateModal.find('.book-img-container').html(`<img src="${book.img}">`)
    // Show update Description input:
    $updateModal.find('.desc-value').html(`<input class="desc-value-update" value="${book.desc}"</input>`)
    // Render save button with the book id:
    $updateModal.find('.save-button-container button').attr('disabled', false)
    $updateModal.find('.save-button-container button').on('click',function(){onUpdateSave(+book.id)})
    // Show the Modal:
    $updateModal.modal()
}

function onUpdateSave(bookId) {
    var newPrice = $('.price-value-update').val()
    if (typeof(newPrice) === 'number') newPrice = +newPrice
    //else - give a warning and redo onUpdateRequest
    var newRate = $('.rate-value-update').text()
    var newDesc = $('.desc-value-update').val()
    update(bookId, newPrice, newRate, newDesc) 
    renderBooksTable()
}

function onDelete(elButton) {
    deleteBook(elButton.id)
    renderBooksTable()
}

function onRateChange(change) {
// This does not change the book's rate, only the display
//only after clicking "save changes", the rate will change
    var prevRate = +$('.rate-value-update').text()
    var newRate = prevRate + change
    if (newRate < 0 || newRate > 10) return
    $('.rate-value-update').text(newRate)
    $('.save-button-container button').attr("disabled", false)
}


function onSetSortBy(elHeader) {
    var property = elHeader.getAttribute('value')
    setSortBy(property)
    renderBooksTable()
    
}




