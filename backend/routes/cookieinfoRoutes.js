import express from "express";
import Cookie from "../models/cookieInfoModel.js";
import mongoose from "mongoose";

const router = express.Router();



router.get("/random", async (req, res) => {
    try{
    const type = req.query.type;
    const idStrings = req.query.exclude? req.query.exclude.split(","):[];
    const excludeIds = idStrings
    .filter(id=>mongoose.Types.ObjectId.isValid(id)) //get only valid id strings
    .map(id=> new mongoose.Types.ObjectId(id)); //map to object id
    
        const cookies = await Cookie.aggregate([
            { $match: { type, _id:{$nin: excludeIds} }},
            { $sample: { size: 1 } }
        ]);
        if (cookies.length === 0) {
            return res.status(404).json({ message: "No more cookies available" });
        }
        res.json(cookies[0]);
        }catch(error){
            console.error("Failed to fetch random cookies:", error);
            res.status(500).json({message: "Server error"});
        }
    });

export default router;