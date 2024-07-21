const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
    // id: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users',UsersSchema);

const TodosSchema = new Schema({
    // id: ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completionStatus: {
        type: Boolean,
        default: false
    },
    userid: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    }
});

const Todos = mongoose.model('Todos',TodosSchema);

module.exports = {
    Users,
    Todos
};