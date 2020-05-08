module.exports = {
  userAuth: function(req, res, next) {
    if(req.session.userId) {
      return next();
    }
    return res.json({msg: 'Please log in to view this resource'});
  }
}