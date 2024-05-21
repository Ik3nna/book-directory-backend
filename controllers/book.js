const Book = require('../models/book');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require("../errors")

const getAllBooks = async (req, res) => {
    const books = await Book.find({});
    res.status(StatusCodes.OK).json({ books })
}

const getSingleBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({_id: id});

    if (!book) {
        throw new NotFoundError(`No book with id ${id}`)
    }

    res.status(StatusCodes.OK).json({ book })
}

const addBook = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ newBook })
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { body: { title, author, pages, link } } = req;
    const book = await Book.findByIdAndUpdate(
        {_id: id},
        req.body,
        { new: true, runValidators: true }
    )

    if (title === "" || author === "" || pages === "" || link === "") {
        throw new BadRequestError("Please ensure you fill in the right details")
    }

    if (!book) {
        throw new NotFoundError(`No book with id ${id}`)
    }

    res.status(StatusCodes.OK).json({book})
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({_id:id});

    if (!book) {
        throw new NotFoundError(`No book with id ${id}`)
    }
    
    res.status(StatusCodes.OK).json({ book })
}

module.exports = {
    getAllBooks,
    getSingleBook,
    addBook,
    updateBook,
    deleteBook
}