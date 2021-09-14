const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    const city = req.body.cityname
    const appid = "10f34cda3751bedbd3d501036b629b9c";
    const units = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + units;
    https.get(url, function (response) {
        console.log(response);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdes = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather is cuurently " + weatherdes + "</h1>");
            res.write("<h1>The temperture in " + city + " is " + temp + "degree celcius</h1>");
            res.write("<img src = " + imageurl + ">");
            res.send();
        });
    });
});



// const city = "kolkata";
//     const appid = "10f34cda3751bedbd3d501036b629b9c";
//     const units = "metric";
//     var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + units;
//     https.get(url, function (response) {
//         console.log(response);
//         response.on("data", function (data) {
//             const weatherdata = JSON.parse(data);
//             const temp = weatherdata.main.temp;
//             const weatherdes = weatherdata.weather[0].description;
//             const icon = weatherdata.weather[0].icon;
//             const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//             res.write("<h1>The weather is cuurently " + weatherdes + "</h1>");
//             res.write("<h1>The temperture in Kolkata is " + temp + "degree celcius</h1>");
//             res.write("<img src = " + imageurl + ">");
//             res.send();
//         });
//     });


app.listen(3000, function () {
    console.log("Server is online on port 3000");
});