var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome,Server is working Fine.........  " });
    
});


require("./routes/customer_route")(app);
require("./routes/driver_route")(app)
require("./routes/booking_route")(app)

app.listen(4500, () => {
    console.log("server running on port: 4500")
});
