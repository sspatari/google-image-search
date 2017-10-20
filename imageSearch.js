var util = require("util"),
    http = require("http");
    fs = require('fs');
    q = ''

    process.argv.forEach((val, index) => {
      if (index === 2) q = val
    });

fs.appendFile('index.html', 'data to append', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

var options = {
    host: "www.google.com",
    port: 80,
    path: '/search?q=' + q + '&tbm=isch'
};

var content = "";

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
        // console.log(content);
        var array = content.split('src="http')
        createFile()
        appendStyle()
        appendStartDiv()
        for (var i = 1, len = array.length; i < len; i++) {
          var src = 'http' + array[i].split('"')[0]
          appendImg(src)
        }
        appendEndDiv()

    });
});

req.end();


function createFile () {
  fs.writeFile("index.html", "", function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });

}

function appendImg (imageSrc) {
  var img = '<img src="' + imageSrc + '" >'
  fs.appendFile('index.html', img, function (err) {
    if (err) throw err;
    console.log(img);
  });
}

function appendEndDiv () {
  var endDiv = '</div>'
  fs.appendFile('index.html', endDiv, function (err) {
    if (err) throw err;
    console.log(endDiv);
  });
}

function appendStartDiv () {
  var startDiv = '<div>'
  fs.appendFile('index.html', startDiv, function (err) {
    if (err) throw err;
    console.log(startDiv);
  });
}

function appendStyle () {
  var style = '<style> div { display: flex; flex-wrap: wrap;} </style>'
  fs.appendFile('index.html', style, function (err) {
    if (err) throw err;
    console.log(style);
  });
}
