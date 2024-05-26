const express = require("express");
const app = express();
const port = 4000;
//Khai báo các package
//body parser để đọc được các file json
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Method override để gọi truy vấn trên HTML
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Thu vien handlebars
const he = require("he");
const path = require("path");
const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      createOptions: function (magvArray, optionsArray) {
        var mangdata = optionsArray.split(",");
        var arrmagv = magvArray.split(",");
        var result = "";
        for (var i = 0; i < arrmagv.length; i++) {
          var element1 = arrmagv[i].trim();
          var element2 = mangdata[i];
          result += `<option value='${element1}'>${element2}</option>`;
        }
        return result;
      },
      sum: (a, b) => a + b,
    },
  })
);

//Cấu hình session
const passport = require("passport");
const session = require("express-session");
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  console.log(done);
  done(null, user.id);
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.static(path.join(__dirname, "/public")));
// Khai báo truy cập đến file routes
const route = require("./router");
route(app);
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
