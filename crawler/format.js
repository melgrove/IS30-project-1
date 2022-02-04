// go through page data
const fs = require('fs');


// if html get date as key and add to object
const obj = {};
fs.readdirSync('./pageData', 'utf-8').forEach(file => {
    if(file.split('.')[1] === 'html') {
        let fileData = fs.readFileSync('./pageData/' + file, 'utf-8')
        obj[file] = fileData;
        console.log('Added ' + file + ' to the object')
    }
})

// save file in svelte static
fs.writeFileSync('../svelte/static/snapshots.json', JSON.stringify(obj));
console.log('Wrote file')