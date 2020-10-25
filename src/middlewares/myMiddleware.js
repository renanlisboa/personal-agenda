exports.globalMiddleware = (req, res, next) => {
  res.locals.title = 'Este é o valor da variável local';
  next();
};

exports.checkAnyError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};