export default (err, req, res, next) => {
  if (!err) next();
  if (req.xhr) {
    res.status(500).send('Something went wrong!');
  } else {
    res.render('error');
  }
};
