import mongoose from "mongoose";

const cookieInfoSchema = new mongoose.Schema({
    name: String,
    from: String,
    purpose: String,
    expires_in: String,
    category: String
}, { collection: "cookie_info" });

const CookieInfo = mongoose.model("CookieInfo", cookieInfoSchema, "cookie_info");

export default CookieInfo;