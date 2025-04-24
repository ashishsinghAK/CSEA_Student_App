const express = require('express')
const fs = require('fs').promises;
const app = express();
const cors = require('cors');
const PORT = 3100
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Server"
    })
})

app.post("/register", async (req, res) => {
    let arr = []
    const { name, email, password } = req.body;
    const fData = await fs.readFile('student.json', { encoding: 'utf-8' });
    arr = JSON.parse(fData);
    if (arr.find(ele => ele.email == email)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            msg: "Already Registered",
        })
    }
    else {
        arr.push({ name, email, password });
        await fs.writeFile('student.json', JSON.stringify(arr, null, 2))
        return res.status(200).json({
            msg: "Registration Successfull",
        })
    }
})

app.post("/login", async (req, res) => {
    let arr = []
    const { email, password } = req.body;
    const fData = await fs.readFile('student.json', { encoding: 'utf-8' })
    arr = JSON.parse(fData)
    if (arr.find(ele => ele.email == email && ele.password == password)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({
            msg: "Login Success",
        })
    }
    else {
        return res.status(500).json({
            msg: "Check your login credentials"
        })
    }
})

app.get("/admin/show", async (req, res) => {
    try {
        const fdata = await fs.readFile('student.json', { encoding: 'utf-8' });
        const studentdata = JSON.parse(fdata);
        res.json({ msg: studentdata })
    } catch (err) {
        res.status(500).json({ msg: err.meesage })
    }

})

app.get("/admin/showByEmail/:email", async (req, res) => {
    const emailid = req.params.email;
    let arr = [];
    //console.log(emailid);
    const data = await fs.readFile('student.json', { encoding: 'utf-8' })
    arr = JSON.parse(data);
    const status = arr.find(ele => ele.email == emailid);
    if (!status) {
        res.json({ msg: "Email is not registered in database" })
    }
    res.json({ msg: status })
})

app.delete("/admin/deleteByEmail/:email", async (req, res) => {
    try {
        const emailid = req.params.email;
        const data = await fs.readFile('student.json', { encoding: 'utf-8' })
        arr = JSON.parse(data);
        const index = arr.findIndex(ele => ele.email == emailid);
        if (index == -1) {
            res.json({ msg: "Email id is not registered in database" });
        }
        arr.splice(index, 1); //remove only one entry
        await fs.writeFile('student.json', JSON.stringify(arr, null, 2));
        res.json({ msg: "Data deleted succssfully!!! " })
    } catch (err) {
        res.json({ msg: err.message });
    }
})

app.patch("/admin/updateByEmail/:email", async (req, res) => {
    const emailid = req.params.email;
    const { name, password } = req.body;
    let arr = [];
    const data = await fs.readFile('student.json', { encoding: 'utf-8' })
    arr = JSON.parse(data);
    const status = arr.find(ele => ele.email == emailid);
    if (!status) {
        res.json({ msg: "Email is not registered in database" })
    }
    status.name = name;
    status.password = password;
    await fs.writeFile('student.json', JSON.stringify(arr, null, 2));
    res.json({ msg: "Data updated successfully!!!" })
})

app.listen(PORT, () => {
    console.log(`Express Server is listening on ${PORT}`);
})