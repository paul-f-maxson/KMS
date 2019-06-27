const router = require('express').Router();

// Add orders to the system
router.post('/add', (req, res) => {
  if (req.body) {
    req.app.locals.ordersService.send({ type: 'ADD', order: req.body.order });
    res.status(200).end();
  } else {
    res.status(400).send('Request must have a body');
  }
  res.end();
});

// test: fetch('http://localhost:5001/api/add', {method: 'POST', mode: 'cors', headers: {'Content-type': 'application/json'}, body: JSON.stringify({order: {table: 100, meals: [{seat: 1, dish: 'apples'}]}})}).then(console.log).catch(console.error)

module.exports = router;
