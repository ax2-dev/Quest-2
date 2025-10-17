const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

server.use(express.static('public'));

function updHits(){
    const path = 'hits.txt';
    let hits = 0;
    if (fs.existsSync(path)){
        const data = fs.readFileSync(path, 'utf-8');
        hits = parseInt(data);
    }

    hits++;
    fs.writeFileSync(path,hits.toString());
    return hits;
};

function fetchWord(){
    const path = 'allwords.txt';
    if(fs.existsSync(path)){
        const data = fs.readFileSync(path,'utf-8');
        const lines = data.split('\n');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        const [word, type, def] = randomLine.split('\t');
        return ({'word':word,'type':type,'def':def});
    }
}

server.get('/ping', function (req, res) {
    res.send('<b>Pong</b>');
});

server.get('/api/getHits', function(req,res){
    const currentHits = updHits();
    res.json({'hits': currentHits});
});

server.get('/api/fetchWord', function(req,res){
    const wordData = fetchWord();
    res.json(wordData);
});

server.listen(port, function () {
    console.log('Server started');
});