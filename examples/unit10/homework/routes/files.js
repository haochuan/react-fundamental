const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middlewares/auth');

const DIR = path.join(__dirname, '../public');

router.get('/', function(req, res) {
  fs.readdir(DIR, (err, files) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ files });
    }
  });
});

router.get('/:fileName', authMiddleware, function(req, res) {
  const { fileName } = req.params;
  fs.readFile(path.join(DIR, fileName), (err, data) => {
    if (err) {
      res.status(500).send(`${fileName} does not exist.`);
    } else {
      res.status(200).send(`${fileName}`);
    }
  });
});

router.post('/:fileName', function(req, res) {
  const { fileName } = req.params;
  fs.writeFile(path.join(DIR, fileName), '', err => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res
        .status(200)
        .json({ message: `${fileName} has been created successfully.` });
    }
  });
});

router.put('/:oldFileName/:newFileName', function(req, res) {
  const { oldFileName, newFileName } = req.params;
  // check if the oldFileName exists
  fs.stat(path.join(DIR, oldFileName), (err, stat) => {
    if (err) {
      res.status(500).json({ err: `${oldFileName} does not exist.` });
    } else {
      fs.rename(
        path.join(DIR, oldFileName),
        path.join(DIR, newFileName),
        err => {
          if (err) {
            res.status(500).json({ err });
          } else {
            res.status(200).json({
              message: `${oldFileName} has been renamed as ${newFileName}`
            });
          }
        }
      );
    }
  });
});
router.delete('/:fileName', function(req, res) {
  const { fileName } = req.params;
  fs.unlink(path.join(DIR, fileName), (err, data) => {
    if (err) {
      res.status(500).json({ err: `${fileName} does not exist.` });
    } else {
      res
        .status(200)
        .json({ message: `${fileName} has been deleted successfully.` });
    }
  });
});

module.exports = router;
