module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next(); //everything looks good, let this user continue on to the next handler
};
