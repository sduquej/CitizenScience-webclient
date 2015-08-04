/**
 * Created by sduquej on 09/02/2015.
 */
module.exports = function (server, db){
//    unique index
    db.appUsers.ensureIndex({
        email: 1
    }, {
        unique: true
    });

server.get("/api/v1/simpleForm/list", function (req, res, next) {
          db.appUsers.find({},{_id:0},function (err, list) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(list));
          });
      return next();
    });

    server.post('api/v1/simpleForm/register', function(req, res, next){
        var user = req.params;
        console.log("User >> "+ JSON.stringify(user));
        db.appUsers.insert(user, function (err, dbUser){
           if (err) {
               // duplicate key error
               if (err.code == 11000) {
                   res.writeHead(400, {
                       'Content-Type': 'application/json; charset=utf-8'
                   });
                   res.end(JSON.stringify({
                       error: err,
                       message: "A user with this email already exists"
                   }));
               }
           }else {
               res.writeHead(200, {
                   'Content-Type': 'application/json; charset=utf-8'
               });
               res.end(JSON.stringify(dbUser));
           }
        });
        return next();
    });







}
