var express = require("express");
var mysql = require("mysql");
var app = express();
/*
* Configure MySQL parameters.
*/
var connection = mysql.createConnection({
host : "104.196.99.219",
user : "class",
password : "P@ssw0rd",
database : "mydb"
});

/*Connecting to Database*/

connection.connect(function(error){
if(error)
{
console.log("Problem with MySQL"+error);
}
else
{
console.log("Connected with Database");
}
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*Start the Server*/

app.listen(process.env.PORT || '8080',function(){
	console.log("It's Started on PORT 8080");
});
/*
app.get('/',function(req,res){
res.sendfile('index.html');
});*/
/*
* Here we will call Database.
* Fetch news from table.
* Return it in JSON.
*/
app.get('/checkLogin/:user/:pass',function(req,res){

connection.query("SELECT login_id, login_username, login_displayname, login_role FROM Login WHERE login_username = '" + req.params.user + "' AND login_password = '" + req.params.pass + "';",function(err,rows){
if(err)
{
console.log("Problem with MySQL"+err);
}
else
{
console.log(rows);
res.end(JSON.stringify(rows));
}
});
});

app.get('/getAllTimesBetweenDatesForRole/:start/:end/:role',function(req,res){
	console.log(req.params);
	connection.query(	"SELECT l.login_displayname, f.free_label, f.free_start, f.free_end, f.free_target_id, l2.login_displayname as target_displayname " +
			"FROM FreeTime f " +
			"LEFT JOIN Login l ON l.login_id = f.login_id " +
			"LEFT JOIN Login l2 ON l2.login_id = f.free_target_id " +
			"WHERE f.free_start >= '" + req.params.start + "' AND f.free_end <= '" + req.params.end + "' AND l.login_role = '" + req.params.role + "' " +
			"ORDER BY l.login_id;",
		function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
			}
			else
			{
				console.log(rows);
				console.log(JSON.stringify(rows));
				res.end(JSON.stringify(rows));
			}
		});
});

app.get('/getAllTimesBetweenDates/:start/:end/:user',function(req,res){
	console.log(req.params);
	if(req.params.user == 'null'){
		console.log("user == null");
		connection.query(	"SELECT l.login_displayname, f.free_label, f.free_start, f.free_end, f.free_target_id, l2.login_displayname as target_displayname " +
				"FROM FreeTime f " +
				"LEFT JOIN Login l ON l.login_id = f.login_id " +
				"LEFT JOIN Login l2 ON l2.login_id = f.free_target_id " +
				"WHERE f.free_start >= '" + req.params.start + "' AND f.free_end <= '" + req.params.end + "' " +
				"ORDER BY l.login_id;",
			function(err,rows)
			{
				if(err)
				{
					console.log("Problem with MySQL"+err);
				}
				else
				{
					console.log(rows);
					console.log(JSON.stringify(rows));
					res.end(JSON.stringify(rows));
				}
		});
	}else{
		connection.query(	"SELECT l.login_displayname, f.free_label, f.free_start, f.free_end, f.free_target_id, l2.login_displayname as target_displayname " +
				"FROM FreeTime f " +
				"LEFT JOIN Login l ON l.login_id = f.login_id " +
				"LEFT JOIN Login l2 ON l2.login_id = f.free_target_id " +
				"WHERE f.free_start >= '" + req.params.start + "' AND f.free_end <= '" + req.params.end + "' AND f.login_id = '" + req.params.user + "';",
			function(err,rows)
			{
				if(err)
				{
					console.log("Problem with MySQL"+err);
				}
				else
				{
					console.log(rows);
					console.log(JSON.stringify(rows));
					res.end(JSON.stringify(rows));
				}
		});	
	}
});

app.get('/createTimeForUser/:start/:end/:user/:type/:target',function(req,res){
	connection.query("SELECT * FROM FreeTime WHERE free_start <= '" + req.params.start + "' AND free_end >= '" + req.params.end + "' AND login_id = '" + req.params.user + "';", function(err, rows){
		if(rows.length == 1){
			if(req.params.type == "Meeting" && rows[0].free_label == "Meeting"){
				//error. Cant schedule meeting over meeting
			}
			if(req.params.type == "Free" && rows[0].free_label == "Free"){
				//error, attempting to put free time inside free time
			}
			if(req.params.type == "Free" && rows[0].free_label == "Meeting"){
				//error cant put free time into meeting slot
			}
			if(req.params.type == "Meeting" && rows[0].free_label == "Free"){
				//success! Let's check the cases.
				//need to add splitting
				//case start times same
				//case end times same
				//case start and end same
				//case start > existing free start and end < existing free end
				if(req.params.start == rows[0].start && req.params.end == rows[0].end){
					//same start, same end. delete and add new entry
				}else if(req.params.start == rows[0].start && req.params.end < rows[0].end){
					//split, make meeting at start of free time, add new free time from end of meeting to existing end
				}else if(req.params.start > rows[0].start && req.params.end == rows[0].end){
					//split, make free time start at existing free time, meeting to end at end time
				}else if(req.params.start > rows[0].start && req.params.end < rows[0].end){
					//make free time before and after meeting
				}
			}
		}else{
			//no existing time. Let's put it in.
			if(req.params.type == "Meeting")
			{
				connection.query("INSERT INTO `FreeTime` (`free_start`, `free_end`, `free_label`, `login_id`, `free_target_id`) VALUES ('" + req.params.start + "', '" + req.params.end + "', '" + req.params.type + "', '" + req.params.user + "', '" + req.params.target + "');",function(err,rows){
					if(err)
					{
						console.log("Problem with MySQL"+err);
					}
					else
					{
						res.end(JSON.stringify(rows));
					}
				});
			} else {
				//check to see if there is an existing free time where end==new.start or start == new.end
				connection.query("INSERT INTO `FreeTime` (`free_start`, `free_end`, `free_label`, `login_id`) VALUES ('" + req.params.start + "', '" + req.params.end + "', '" + req.params.type + "', '" + req.params.user + "');",function(err,rows){
					if(err)
					{
						console.log("Problem with MySQL"+err);
					}
					else
					{
						res.end(JSON.stringify(rows));
					}
				});
			}
		}
	});

});

app.get('/usernameExist/:user',function(req,res){
	connection.query("SELECT count(1) as exist FROM Login WHERE login_username = '" + req.params.user + "';",function(err,rows){
		if(err)
		{
			console.log("Problem with MySQL"+err);
		}
		else
		{
			res.end(JSON.stringify({success: true, isExist: rows[0].exist >= 1}));
		}
	});
});

app.get('/createUser/:user/:display/:pass/:role',function(req,res){
	connection.query("SELECT * FROM Login WHERE login_username = '" + req.params.user + "';",function(err,rows) {
		if(rows.length == 0) {
			connection.query("INSERT INTO `Login` (`login_username`, `login_displayname`, `login_role`, `login_password`) VALUES ('" + req.params.user + "', '" + req.params.display + "', '" + req.params.role + "', '" + req.params.pass + "');", function (err, rows) {
				if (err) {
					console.log("Problem with MySQL" + err);
				}
				else {
					res.end(JSON.stringify({success: true}));
				}
			});
		}else{
			res.end(JSON.stringify({success: false}));
		}
	});
});
app.get('/removeUser/:id',function(req,res){
	connection.query("DELETE FROM Login WHERE login_id = '" + req.params.id + "';",function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
			}
			else
			{
				res.end(JSON.stringify({success: true}));
			}
		});
});
app.get('/getAllUsers',function(req,res){
	connection.query("SELECT login_id, login_username, login_displayname, login_role FROM Login;",function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
			}
			else
			{
				res.end(JSON.stringify(rows));
			}
		});
});
app.get('/removeTimeForUser/:start/:end/:user',function(req,res){
	connection.query("DELETE FROM FreeTime WHERE free_start = '" + req.params.start + "' AND login_id = '" + req.params.user + "';",function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
			}
			else
			{
				res.end(JSON.stringify({success: true}));
			}
		});
});
app.get('/getIDforUser/:user',function(req,res){
		connection.query("SELECT login_id FROM Login WHERE login_username = '" + req.params.user + "';",function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
			}
			else
			{
				res.end(JSON.stringify(rows));
			}
		});
});
