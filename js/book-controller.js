
'use strict';
const READ = 'read'
const UPDATE = 'update'
const DELETE = 'delete'

function init() {
    doTrans()
    createBooks()
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
    doTrans()
}

function getActionsContainer(id) {
    var strHtml =  `<span>
                        <button class="btn btn-outline-info" data-id="${id}" value="read" data-trans="read-btn" onclick="onRead(this)">Read</button>
                        <button class="btn btn-outline-success" data-id="${id}" value="update" data-trans="update-btn" onclick="onUpdateRequest(this)">Update</button>
                        <button class="btn btn-outline-danger data-id="${id}" value="delete" data-trans="delete-btn" onclick="onDelete(this)">Delete</button>
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
    var desc = $('.desc-value').val()
    if (typeof(price) === 'number' && typeof(rate) === 'number') {
        price = +price
        rate = +rate
    } //else give warning and redo onAddRequest
    if (title === '') return 
    add (title, price, rate, desc) 
    renderBooksTable()
}


function onRead(elButton) {
    var bookId = elButton.dataset.id
    var book = read(bookId)
    renderDetailsModal(book)
    
}

function renderDetailsModal(book) {
    var $readModal = $('#read-update-modal')
    // Show Title:
    $readModal.find('.modal-title').text(book.title)
    // Show Price
    $readModal.find('.price-value').text(book.price)
    // Show Rating - when clicked enables Save Changes button.
    $readModal.find('.rate-value-update').text(+book.rate)
    // Show Image:
    $readModal.find('.book-img-container').html(`<img src="${book.img}">`)
    // Show Description
    $readModal.find('.desc-value').text(book.desc)
    // Render Save Changes button with the book id. Disabled by Defualt.
    $readModal.find('.save-button-container button').attr('disabled','disabled')
    $readModal.find('.save-button-container button').attr('data-id', book.id)

    doTrans()
    // Show the modal
    $readModal.modal()
}


function onUpdateRequest(elButton) {
    var bookId = elButton.dataset.id
    var book = getBookById(bookId)
    renderUpdateModal(book)
}


function renderUpdateModal(book) {
    var $updateModal = $('#read-update-modal')
    // Show update Title input:
    $updateModal.find('.modal-title').text(book.title)
    // Show update Price input:
    $updateModal.find('.price-value').html(`<input type="text" class="price-value-update" value="${book.price}"></input>`)
    // Show update Rate input:
    $updateModal.find('.rate-value-update').text(+book.rate)
    // Show Image:
    $updateModal.find('.book-img-container').html(`<img src="${book.img}">`)
    // Show update Description input:
    $updateModal.find('.desc-value').html(`<input class="desc-value-update" value="${book.desc}"></input>`)
    $updateModal.find('.desc-value').html(`<textarea cols="50" rows="3" class="desc-value-update">${book.desc}</textarea>`)
    // Render save button with the book id:
    $updateModal.find('.save-button-container button').attr('disabled', false)
    $updateModal.find('.save-button-container button').attr('data-id', book.id)
    doTrans()
    // Show the Modal:
    $updateModal.modal()
}

function onUpdateSave(elButton) {
    var bookId = elButton.dataset.id
    var book = getBookById(bookId)
    var newPrice = $('.price-value-update').val()
    var newDesc = $('.desc-value-update').val()
    var newRate = $('.rate-value-update').text()
    console.log('newRate', newDesc)
    
    if (!newDesc) newDesc = book.desc
    
    if (!newPrice) newPrice = book.price
    else if (typeof(newPrice) === 'number') newPrice = +newPrice //add error at else
    
    update(bookId, newPrice, newRate, newDesc) 
    
    renderBooksTable()
}

function onDelete(elButton) {
    var bookId = elButton.dataset.id
    deleteBook(bookId)
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

function onChangeLanguage(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    init()
}




