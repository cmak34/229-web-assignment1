// reserved for assignment 2
// const mongoose = require("mongoose");

// const pageSchema = new mongoose.Schema({
//     "slug": {
//         "type": String,
//         "default": null,
//     },
//     "title": {
//         "type": String,
//         "default": null
//     },
//     "body": {
//         "type": String,
//         "default": null
//     },
//     "status": {
//         "type": String,
//         "enum": ["published", "pending", "archived"],
//     },
//     "owner": {
//         "type": Array,
//         "default": null

//     },
//     "createdTime": {
//         "type": Date,
//         "default": null
//     },
//     "updatedTime": {
//         "type": Date,
//         "default": null
//     }
// }, {
//     collection: "pages",
//     statics: {
//         findBySlug(slug) {
//             return this.find({ slug: new RegExp("slug", 'i') });
//         },
//         findByName(title) {
//             return this.find({ title: new RegExp("title", 'i') });
//         }
//     }
// })

// module.exports = mongoose.model('Page', pageSchema);