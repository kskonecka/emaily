module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  next(); //everything looks good, let this user continue on to the next handler
};
