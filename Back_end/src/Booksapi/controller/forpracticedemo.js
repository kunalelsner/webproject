exports.genericHandler =function async (req, res, next) {
    res.json({
      status: 'success',
      data: req.body
    });
  };
