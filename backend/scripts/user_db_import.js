const fs = require('fs');
const readline = require('readline');
var totalLineReaded;

function sendPostToServer(url, arr){
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencded");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            // показать что-нибудь пользователю
        }
    };
    xhr.send(JSON.stringify({batch: arr}));
}

async function sendToDatabase(pathToImportedFile){
    const batchSize = 20;
    const fileStream = fs.createReadStream(pathToImportedFile);
    const rl = readline.createInterface({
        input: fileStream,
        clrfDelay: Infinity
    });
    totalLineReaded = 0;
    var lineReaded = 0;
    var batch = [];
    var url;

    for await (const line of rl){
        var obj = JSON.parse(line);
        // выбор url по типу объектов в файлах
        if(totalLineReaded === 0){
            if(obj.text !== undefined){
                // tip или review
                if(obj.stars !== undefined)
                    url = '/add/reviews';
                else
                    url = '/add/tips';
            }
            else{
                if(obj.adress !== undefined)
                    url = '/add/business';
                else
                    url = '/add/users';
            }
        }
        batch.push(obj);
        lineReaded ++;
        totalLineReaded ++;
        if(lineReaded === batchSize){
            sendPostToServer(url, batch);
            batch = [];
            lineReaded = 0;
        }
    }
    if(lineReaded !== 0){
        sendPostToServer(url, batch);
    }
}