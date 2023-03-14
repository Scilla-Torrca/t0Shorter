const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const shortUrl = require("./models/shorterModel");
const user = require("./models/userModel");

const app = express();

require("dotenv").config();
const MONGOURL = process.env.MONGOURL;

// mongodbと接続
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("connect DB");
    })
    .catch((err) => {
        console.log("error");
    })

app.listen(3000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 短縮URLエンドポイント
app.post("/api/url", async (req,res) => {
    try {
        const sur = await new shortUrl({
            "full": req.body.fullurl,
            "userid": req.body.id
        });

        const shortSUR = await sur.save();

        return res.status(200).json(shortSUR);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// 転送
app.get("/:id", async (req,res) => {
    const URL = await shortUrl.findOne({ short: req.params.id });
    if(URL === null) return res.sendStatus(404);

    URL.clicks++;
    URL.save();
    res.redirect(URL.full);
});

app.use(express.json());
// ユーザー登録
app.post("/api/register", (req,res) => {
        const Email = req.body.email;
        const password = req.body.password;
        bcrypt.hash(password,10).then((hashPassword) => {
            const User = new user({
                email: Email,
                password: hashPassword
            });
            User.save();
        })

        return res.status(200).json({
            message: "OK",
        });
});