const http = require('http')
const fs = require('fs').promises;

const PORT = 3100

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-method','GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');

    if(req.method=="OPTIONS"){
        res.statusCode=200;
        return res.end();
    }
    
    if (req.url == '/register' && req.method == 'POST') {
        let body = ''
        let arr = []
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {
            const { name, email, password } = JSON.parse(body);
            // console.log(name);
            const fData = await fs.readFile('student.json', { encoding: 'utf-8' });
            arr = JSON.parse(fData);
            // console.log(arr);
            if (arr.find(ele => ele.email == email)) {
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ "message": "This Email is already Register. Kuch naya try karo" }))
            }
            else {
                arr.push({ name, email, password });
                await fs.writeFile('student.json', JSON.stringify(arr, null, 2))
                return res.end(JSON.stringify({ "message": "Registration Successfully" }))
            }

            // console.log(body)
        })
        
    }

    if(req.url=='/login' && req.method=='POST'){
        let body = ''
        let arr = []
        req.on('data', (data) => {
            body += data
        })

        req.on('end',async () => {
            const {email, password } = JSON.parse(body);
            const fData = await fs.readFile('student.json', { encoding: 'utf-8' });
            arr = JSON.parse(fData);
            if(arr.find(ele => ele.email==email && ele.password == password)){
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ "message": "Success" }))
            }
            else{
                return res.end(JSON.stringify({ "message": "Login Failed. Check your Credentials" }))
            }
        })

    }
    // res.end("Welcome to Node Server")
})

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})