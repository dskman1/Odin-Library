const dialog = document.querySelector("#dialog");
const openBtn = document.querySelector('#open-dialog');
const closeBtn = document.querySelector("#close-dialog");
const resetBtn = document.querySelector(".reset-btn")
const form = document.querySelector("#myform");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#num-input");
const read = document.querySelector("#isread");
const alertBookIn = document.querySelector("#alertMassage");
const booksArea = document.querySelector(".books");

const myLibrary = [];

resetBtn.addEventListener("click", ()=>{
    alertBookIn.textContent = "";
})

openBtn.addEventListener("click", () =>{
    dialog.showModal();
    })

closeBtn.addEventListener("click", () =>{
    alertBookIn.textContent = "";
    dialog.close();
})

dialog.addEventListener("click", (ev)=>{
    if(ev.target === dialog){
        dialog.close();
    }
})
    // to prevent negative number and zero at the start
pages.addEventListener("input", function() {
    let value = this.value;
    if(/^[-0]/.test(value)){
        this.value = value.slice(1);
    }
    });

    
form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    //check checkbox state
    const isRead = read.checked;

    makeNewBook(
        title.value,
        author.value,
        pages.value,
        isRead
    );

    form.reset();  
    dialog.close();
});


function checkBookInside(title){
    alertBookIn.textContent = "";

    if(myLibrary.length > 0){
        for(const book of myLibrary){
            if(book.title == title){ 
                displayBookIsAdded();
                return false;
            }
        }
    }
    return true;
};


function displayBookIsAdded(){
return alertBookIn.textContent = "Book Is Already Added";
};

const checkRead = bookState => bookState === true  ? "Read" : "Not Read";

function Book(title, author, numPages, isRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function(){
    this.isRead = !this.isRead
}

function makeNewBook(title, author, numPages, isRead ){
    const bookIsValid = checkBookInside(title);
    
    if(bookIsValid){
    const newBook = new Book(title, author, numPages, isRead)
    myLibrary.push(newBook);
    displayCards();

    } 
    return myLibrary;
};

function BookCard(book){

    const bookCard = document.createElement("div");
    const btnContainer = document.createElement("div");
    const titleEl = document.createElement("p");
    const authorEl = document.createElement("p");
    const pagesEl = document.createElement("p");
    const readBtn = document.createElement("button");
    const deleteBookBtn = document.createElement("button");

    titleEl.textContent = "Title: " + book.title;
    authorEl.textContent = "Author: " + book.author;
    pagesEl.textContent = "Pages:" + book.numPages;
    readBtn.textContent = checkRead(book.isRead);
    deleteBookBtn.textContent = "Delete";

    bookCard.classList.add("book-card")
    btnContainer.classList.add("book-buttons")
    readBtn.classList.add("isRead-btn")
    deleteBookBtn.classList.add("delete-btn")

    bookCard.dataset.id = book.id;

    booksArea.append(bookCard);
    btnContainer.append(readBtn, deleteBookBtn);

    bookCard.append(
        titleEl,
        authorEl,
        pagesEl,
        btnContainer
    );

     if(book.isRead == true){
            readBtn.style.backgroundColor = "green"
        }else{
            readBtn.style.backgroundColor = "red"
        }

     



    readBtn.addEventListener("click", () =>{ 
        if(book.isRead == true){
            readBtn.style.backgroundColor = "red"
        }else{
            readBtn.style.backgroundColor = "green"
        }

        book.toggleRead();
        readBtn.textContent = book.isRead ? "Read": "Not Read";
    });

    
    deleteBookBtn.addEventListener('click', function(){
        const idElement = bookCard.dataset.id;
        removeBook(idElement);
    })

    return bookCard;
};

function displayCards() {
    booksArea.textContent = "";
    myLibrary.forEach(book => {
        BookCard(book);
    });
};

function removeBook(bookId){
  const index = myLibrary.findIndex(book => book.id === bookId);
  if(index !== -1){
    myLibrary.splice(index, 1)
    displayCards();
    console.table(myLibrary)
  }
    
};
