const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
            default: "",
            trim: true,
            required: "Contact Name is required"
        },
        contactNumber: { 
            type: String, 
            required: true,
            required: "Contact Name is required"
        },
        email: {
            type: String,
            default: "",
            trim: true,
            required: "Email is required"
        }
    }, {
        collection: "contacts"
    }
)

module.exports = mongoose.model('Contact', contactSchema);