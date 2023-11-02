import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import db from '../config/dbConfig.js';
import { Server } from 'socket.io';
export const register = (req, res) => {
    const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.status(401).json({ Error: "Loi dang nhap" });
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.status(500).json({ Error: "loi khi dang ky" });
            return res.status(200).json({ Status: "Success" });
        })
    })
};

export const login = (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.status(404).json({ Error: "Login error in server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, respone) => {
                if (respone) {
                    const id = data[0].id;
                    const name = data[0].name;
                    const email = data[0].email;
                    const token = jwt.sign({ id, name, email }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie("token", token);
                    res.cookie("idUser", id);
                    return res.status(200).json({ Status: "Success" })
                }
                else return res.status(500).json({ Error: "Password not found" })
            })

        } else {
            return res.status(404).json({ Error: "No email existed" });
        }
    })
};
export const users = (req, res) => {
    const sql = "SELECT id, name, email FROM login";
    db.query(sql, (err, data) => {
        if (err) return res.status(404).json({ Error: "loi lenh query" });
        if (data.length > 0) {
            return res.status(200).json(data);

        } else {
            return res.status(404).json({ Error: "Khong co user nao" });
        }
    })
};
export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
};
export const apichat = (req, res) => {
    console.log("data client gửi" + req.body.sender,
    req.body.receiver,
    req.body.text,);
    const sql = 'INSERT INTO chat_messages (sender, receiver, text) VALUES (?)';

    const values = [
        req.body.sender,
        req.body.receiver,
        req.body.text,
    ]

    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ Error: "Loi khi insert data" });
        io.emit('newMessage', { sender: req.body.sender, receiver: req.body.receiver, text: req.body.text });

        return res.status(200).json({ Status: "Success" });
    })

};