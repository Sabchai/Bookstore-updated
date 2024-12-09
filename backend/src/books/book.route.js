
const express= require('express');
const router = express.Router(); 
const Book= require('./book.model');
const { postABook, getAllBooks,getSingleBook,UpdateBook, deleteABook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');



// post a book: http://localhost:5000/api/books/create-book

router.post("/create-book",  verifyAdminToken, postABook)

// get all the books: http://localhost:5000/api/books/

router.get("/",getAllBooks);

// get book by id : http://localhost:5000/api/books/:id

router.get("/:id", getSingleBook);

// update a book: http://localhost:5000/api/books//edit/:id

router.put("/edit/:id",verifyAdminToken, UpdateBook);

// delete book: http://localhost:5000/api/books/:id

router.delete("/:id",verifyAdminToken, deleteABook)


module.exports = router;