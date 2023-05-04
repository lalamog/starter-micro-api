const express = require("express");
const app = express();
const loggedIn = require("../controllers/loggedin");
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const newreg = require("../controllers/newreg");
const db = require("../routes/db-config");
const router = express.Router();
router.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

console.log(__dirname)

router.get("/", loggedIn, (req, res, next) => {
    if (req.user) {
      const status = "loggedIn";
      res.render("index", { status: status, user: req.user });
      console.log(status);
    } else {
      const status = "Status is not logged in. Log in first";
      res.render("index", { status: status, user: "nothing" });
      console.log(status);
    }
  });

  // Middleware to restrict access to /dashboard if not logged in
const dashboardAccessMiddleware = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect("/");
  }
};

/*
const checkPending = (req, res, next) => {
  const email = req.body.email; // assuming email is in the request body
  const pending = req.body.pending; // assuming 'pending' is a boolean column in your table
  console.log(email);
  console.log(pending)
  db.query(
    "SELECT * FROM user WHERE email = ? AND pending = ?",
    [email, pending],
    (err, result) => {
      if (err) throw err;
      if (!result.length) {
        return res.json({
          status: "error",
          error: "Your account is still pending",
        });
      } else {
        next();
      }
    }
  )
};
*/

router.get("/editUserView/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  
  const query = "SELECT * FROM user WHERE id = ?";
  db.query(query, [userId], function(error, data){
    if (error){
      throw error;
    } else {
      if (data.length > 0) {
        const user = data[0];
        res.locals.userId = userId;
        res.render("editUserView1", { user: user });
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});


const adminMiddleware = (req, res, next) => {
  const userId = req.user.id;
  db.query("SELECT * FROM user WHERE id = ?", [userId], (err, results) => {
    if (err) throw err;

    const user = results[0];
    if (user.role === "admin") {
      return next();
    } else {
      console.log("You're not Admin!")
      res.clearCookie("userRegistered");
      res.redirect("/");
    }
  }); 
};

router.get("/login", loggedIn, adminMiddleware, (req , res) => {
  res.sendFile("login.html", {root: "./public"});
})

router.get("/loginnew", (req , res) => {
    res.sendFile("loginnew.html", {root: "./public"});
})

router.get("/editUserView", (req , res) => {
  res.sendFile("editUserView.html", {root: "./public"});
})

router.get("/rasa", (req , res) => {
    res.sendFile("rasa.html", {root: "./public"});
})

router.get("/login", (req , res) => {
    res.sendFile("login.html", {root: "./public/"});
})

router.get("/dashboardAdmin", loggedIn, dashboardAccessMiddleware, (req, res) => {
  res.sendFile("dashboard_admin.html", { root: "./public/" });
});

router.get("/dashboardRegular", loggedIn, dashboardAccessMiddleware, (req, res) => {
  res.sendFile("dashboard_regular.html", { root: "./public/" });
});


router.get("/newregister", (req , res) => {
    res.sendFile("newregister.html", {root: "./public/"});
})

router.get("/userview",loggedIn, dashboardAccessMiddleware, (req, res) => {
    var query = "SELECT * FROM user ORDER BY id DESC";
    db.query(query, function(error, data){
        if (error){
            throw error
        }
        else{
            res.render('user-view', {title: 'Node.js MySQL CRUD Application', action:'list', sampleData: data})
        }
    })
})

router.get("/calendar", loggedIn, dashboardAccessMiddleware,(req , res) => {
    res.sendFile("calendar.html", {root: "./public/"});
})

router.get("/accesorAdmin",loggedIn, dashboardAccessMiddleware, (req , res) => {
    res.sendFile("accesor_admin.html", {root: "./public/"});
})

router.get("/accesorRegular",loggedIn, dashboardAccessMiddleware, (req , res) => {
  res.sendFile("accesor_regular.html", {root: "./public/"});
})

router.put('/approve/:id', (req, res) => {
  console.log("redritect")
  const userId = req.params.id;

  db.query(
    'UPDATE user SET pending = 0 WHERE id = ?',
    [userId],
    (error, results) => {
      if (error) {
        return res.json({
          status: 'error',
          error: 'Error approving user'
        });
      }
      return res.json({
        status: 'success',
        success: 'User approved successfully'
      });
    }
  );
});

router.get("/logout", logout);
router.get("/newreg", newreg);
module.exports = router;
