const express = require ("express");
const router = express.Router();
const requests = require("./requests");
const Joi = require("joi");

function validateRequest(re){
	const requestSchema = {
		item: Joi.string().min(4),
		requestType: Joi.string().min(4)
	 }

	 return Joi.validate(re, requestSchema)
}

//Get all the requests of a user
router.get("/", (req, res) => {
 res.send(requests);
});


//Get a specific request of a user
router.get("/:id", (req, res) => {
	const request = requests.find(rq => rq.id === parseInt(req.params.id));
    if(!request) {
	res.status(404).send("The requests with id " + parseInt(req.params.id) + " was not found");
	}
    else { res.send(request) }
});


//Create a request
router.post("/", (req, res) => {
 
 const checkRequest = validateRequest(req.body);

 if(checkRequest.error){
	res.status(400).send(checkRequest.error.details[0].message);
}
 const request = {
	id: requests.length + 1,
	item: req.body.item,
	requestType: req.body.requestType
 };

 requests.push(request);
 res.send (requests);
});


//Update a request
router.put("/:id", (req, res) => {
	const request = requests.find(rq => rq.id === parseInt(req.params.id));
    if(!request) {
	res.status(404).send("The requests with id " + parseInt(req.params.id) + " was not found");
	}

    const checkRequest = validateRequest(req.body);

    if(checkRequest.error){
		res.status(400).send(checkRequest.error.details[0].message);
	}
	request.item = request.body.item;
	request.requestType = request.body.requestType;

	res.send(requests);
});


//Delete a request
router.delete("/:id", (req, res) => {
	const request = requests.find(rq => rq.id === parseInt(req.params.id));
    if(!request) {
		res.status(404).send("The requests with id " + parseInt(req.params.id) + " was not found");
		}
    else { 
	const index = requests.indexOf(request);
	requests.splice(index, 1);
	res.send({requests})
}
});


module.exports = router;
