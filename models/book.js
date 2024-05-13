const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Each book must have a title']
    },
    author: {
        type: String,
        required: [true, 'The book must have been written by somebody']
    },
    type: {
        type: String,
        enum: {
            values: ['Novel', 'Text book', 'Magazine', 'Newspaper'],
            message: '{VALUE} is not supported'
        },
    },
    pages: {
        type: Number,
        required: [true, 'Please provide the number of pages']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    link: {
        type: String,
        required: [true, 'Please provide a valid url for the book']
    }
});

module.exports = mongoose.model('Book', BookSchema)