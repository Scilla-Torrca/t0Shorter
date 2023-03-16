const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const shortUrl = require("./models/shorterModel");
const user = require("./models/userModel");

const app = express();

require("dotenv").config();
const MONGOURL = process.env.MONGOURL;
const domain = process.env.Domain;

const smtp = nodemailer.createTransport({
    host: process.env.SMTPHost,
    port: process.env.SMTPPort,
    secure: true,
    auth: {
        user: process.env.serverEmail,
        pass: process.env.serverEmailPass
    }
});

const sendCheckMail = (user) => {
    try {
        const url = domain + "/email/" + user.checkEmailPoint;
        const text = "アカウントを認証するには次のアドレスにアクセスしてください\n" + url;
        const message = {
            from: "server<server@torrca.com>",
            to: user.email,
            envelope: {
                from: "server@torrca.com",
                to: user.email
            },
            subject: "ユーザー登録確認メール",
            text: text
        }

        smtp.sendMail(message, (error,info) => {
            if(error){
                console.log("send failed");
                console.log(error.message);
                return;
            }

            console.log("send successful");
            console.log(info.messageId);
        })

    } catch (err) {
        console.log(err);
    }
}

app.get("/email/:id", (req,res) => {
    const id = req.params.id;
    const checkuser = User.findOne({checkEmailPoint: id});
    if(chechuser == null) return res.status(404).json({message:"ユーザーが見つかりません"});
    checkuser.isCheckEmail = true;
    return res.status(200).json("OK");
});

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





// 短縮URLのあれ（）
// 短縮元送るやつ（
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
    if(URL == null) return res.sendStatus(404);

    URL.clicks++;
    URL.save();
    res.redirect(URL.full);
});






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

        sendCheckMail(User);

        return res.status(200).json({
            message: "OK"
        });
});

app.post("/api/login", async (req,res) => {
    const loginMail = req.body.email
    const loginPassword = req.body.password
    const userdata = await user.findOne({ email: loginMail });
    if(userdata == null) return res.status(404).json({message:"ユーザーが見つかりません"});

    const valuedPassword = await bcrypt.compare(loginPassword,userdata.password);
    if(!valuedPassword) return res.status(200).json({message:"パスワードが違います"});

    if(userdata.isCheckEmail == false) return res.status(200).json({ message:"メール認証を行ってください" });
    
    return res.status(200).json(userdata.id);
});

