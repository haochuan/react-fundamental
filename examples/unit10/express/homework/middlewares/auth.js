/**
 *
 * Example custom middlewre
 *
 */

module.exports = function(req, res, next) {
  const { fileName } = req.params;
  const { token } = req.query;
  if (/private/.test(fileName)) {
    if (token === '12345') {
      next();
    } else {
      res.status(401).json({ err: 'Unauthorized' });
    }
  } else {
    next();
  }
};
