const fs = require('fs');

//Synchronous 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');

//Asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) {
        return console.error('Problem opening file: File does not exist');
    }
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, (err) => {
                console.log('Data written!');
            })
        })
    });
});

console.log('Will read file!');
