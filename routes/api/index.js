const router = require('express').Router();

// Forward body of the request to the machine as an event
router.post('/dispatch', (req, res) => {
  if (req.body) {
    req.app.locals.ordersService.send(req.body.event);
    res.status(200).end();
  } else {
    res.status(400).send('Request must have a body');
  }
  res.end();
});

// usage example: fetch('http://localhost:5001/api/dispatch', {method: 'POST', mode: 'cors', headers: {'Content-type': 'application/json'}, body: JSON.stringify({event: {type: 'ADD', order: {table: 100, meals: [{seat: 1, dish: 'apples'}]}})}}).then(console.log).catch(console.error)

module.exports = router;
