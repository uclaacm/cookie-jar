import mongoose from "mongoose";

const cookieSchema = new mongoose.Schema({
    name: String,
    from: String,
    purpose: String,
    expires_in: String,
    category: String
}, {collection: "cookie_info"});

const Cookie = mongoose.model("Cookie", cookieSchema, "cookie_info");

export default Cookie;