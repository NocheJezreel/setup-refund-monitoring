const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    firmName: {
        type: String,
        required: true,
    },
    no: {
        type: Number,
        required: true,
    },
    amountOfAssistance: {
        type: Number,
        required: true,
    },
    // Fields for Cumulative section
    balance: {
        type: Number,
        required: true,
    },
    totalRefundedAmount: {
        type: Number,
        required: true,
    },
    totalAmountPayable: {
        type: Number,
        required: true,
    },
    delayedMonths: {
        type: Number,
        required: true,
    },
    // Fields for Monthly section
    due: {
        type: Number,
        required: true,
    },
    payable: {
        type: Number,
        required: true,
    },
    arrears: {
        type: Number,
        required: true,
    },
    username: String,
    password: String,
});

authorSchema.pre('save', function (next) {
    const username = this.firmName.toLowerCase().replace(/\s/g, '');
    const password = `${this.firmName}${this.no}`;
    this.username = username;
    this.password = password;
    next();
});

module.exports = authorSchema;
