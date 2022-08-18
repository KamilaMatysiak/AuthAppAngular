const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;

console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.db}`);

db.mongoose.connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to database.");
    initial();
}).catch(err => {
    console.error("Connection error ", err);
    process.exit();
})

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({message: "Welcome!"});
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on ' + port);
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) console.log("error", err);
                console.log("Added role 'user'.");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err) console.log("error", err);
                console.log("Added role 'admin'.");
            })
        }
    })
}