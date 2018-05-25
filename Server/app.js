const express = require("express");
const app = express();
const jsonParser = require("body-parser").json;

app.use(jsonParser());

const routes = require("../server/routes");

app.use("/api/v1/users/requests", routes);

//Catch error and forward to error handler
app.use((req,res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	})
});


app.listen(process.env.PORT || 3000, () => {
 console.log("The app is listening on port 3000")
});
