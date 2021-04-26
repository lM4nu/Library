const closeModal = document.querySelector('#close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.addBtn');
const submitBtn = document.querySelector('#submitBtn');
const panel = document.querySelector('.panel');
const error = document.querySelector('.error');


const titleInput = document.querySelector('#titleInp');
const authorInput = document.querySelector('#authorInp');
const pagesInput = document.querySelector('#pagesInp');
const readInput = document.querySelector('#readInp');




const hideModal = () => modal.classList.add('hidden');
const showModal = () => modal.classList.remove('hidden');

closeModal.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
addBtn.addEventListener('click', showModal);


class Book {

	constructor(title,author,pages,read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	}
}


let books;


const drawBook = (book) => {

panel.insertAdjacentHTML('beforeend',`
<div class="book">
	<div class="readed">
	<h1>${book.read ? "Completed" : "Pending"}</h1>
	<input class="state" type="checkbox" ${book.read ? "checked" : ""}></input>
	</div>
	<h1> ${book.title}</h1>
	<div class="info">
	<h1> ${book.author}</h1>
	<h1 id="pages"> Pages: ${book.pages}</h1>
	</div>
</div>
`);

let aux = document.querySelectorAll('.state').length

document.querySelectorAll('.state')[aux-1].addEventListener('click', (e) => {

	e.target.toggleAttribute('checked');
	e.target.hasAttribute('checked') ? e.target.parentNode.querySelector('h1').innerText = 'Completed' :  e.target.parentNode.querySelector('h1').innerText = 'Pending' 
	const bookDiv = e.target.parentNode.parentNode;
	const pagesValue = bookDiv.querySelector('#pages').innerText.match(/\d*/g).join("");

	books.forEach( book => {
		if (book.pages == pagesValue)
		 book.read = e.target.hasAttribute('checked') ;
	
	});
	save();

})


return book;

}

if(localStorage.getItem('books') ) {
	books = JSON.parse(localStorage.getItem('books'))
	books.forEach(book => drawBook(book));
 }else{
	books = [];
 } 

const save = () => {
	localStorage.clear();
	localStorage.setItem('books',JSON.stringify(books))
}




submitBtn.addEventListener('click', (e) => {
if(!titleInput.value || !authorInput.value || !pagesInput.value ){
error.classList.remove('hidden');
return;
}

books.push(drawBook(new Book(titleInput.value,authorInput.value,pagesInput.value,readInput.checked) ) )
error.classList.add('hidden');
titleInput.value = "";
authorInput.value = "";
pagesInput.value = "";
readInput.checked = false;
hideModal();
save();

});




