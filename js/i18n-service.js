const DEFUALT_LANG = 'en'
var gCurrLang 
var gTrans = createTrans()


function createTrans() {
    var trans = {
        'book-id': {
            en: 'Id',
            he: 'מזהה'
        },
        'book-title': {
            en: 'Title',
            he: 'שם הספר'
        },
        'book-price':{
            en: 'Price',
            he: 'מחיר'
        },
        'book-actions': {
            en: 'Actions',
            he: 'פעולות'
        },

        'ph-added-book-title': {
            en: 'Title',
            he: 'שם'
        },
        'ph-added-book-price': {
            en: 'Price',
            he: 'מחיר'
        },
        'ph-added-book-rate': {
            en: 'Rate',
            he: 'דירוג'
        },
        'ph-added-book-desc': {
            en: 'description',
            he: 'תיאור'
        },

        'added-book-title': {
            en: 'Book Title',
            he: 'שם הספר'
        },
        'added-book-price': {
            en: 'Set Book Price',
            he: 'קבע מחיר'
        },
        'added-book-rate': {
            en: 'Set Book Rate',
            he: 'דרג את הספר' 
        },
        'added-book-desc': {
            en: 'Add a short description',
            he: 'הוסף תיאור קצר'
        },
        'price': {
            en: 'Price',
            he: 'מחיר'
        },
        'rating': {
            en: 'Rating',
            he: 'דירוג'
        },
        'desc': {
            en: 'Description',
            he: 'תיאור'
        },
        'add-btn': {
            en: 'Add',
            he: 'הוסף'
        },
        'read-btn': {
            en: 'Read',
            he: 'מידע'
        },
        'update-btn': {
            en: 'Update',
            he: 'עדכן'
        },
        'delete-btn': {
            en: 'Delete',
            he: 'מחק'
        },
        'title-add-book': {
            en: 'Add Book',
            he: 'הוסף ספר'
        },
        'page-title': {
        en: 'Book Shop',
        he: 'חנות ספרים'
        },
        'save': {
            en: 'Save Changes',
            he: 'שמור'
        },
        'close': {
        en: 'Close',
        he: 'סגור'
        }
    }
    return trans
}

function doTrans() {
    var elTransEls = document.querySelectorAll('[data-trans]')
    for (let i = 0; i < elTransEls.length; i++) {
        var el = elTransEls[i]
        var transKey = el.dataset.trans
        var transText = getTranTxt(transKey)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', transText)
        }
        else el.innerText = transText
    }
}

function getTranTxt(key) {
    var transForKey = gTrans[key]
    if (!transForKey) return 'UNKNOWN'
    var txt = transForKey[gCurrLang]
    if (!txt) txt = transForKey[DEFUALT_LANG]
    return txt
}

function setLang(lang) {
    gCurrLang = lang
}