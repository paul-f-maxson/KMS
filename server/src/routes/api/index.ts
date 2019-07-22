import { ValidRequest } from 'kms-types';
import { Request, Response } from 'express';

const router = require('express').Router();

const isValidRequest = (req: any): req is ValidRequest =>
  req.body && req.body.type && req.body.order;

// Forward body of the request to the machine as an event
router.post('/dispatch', (req: Request, res: Response) => {
  if (isValidRequest(req)) {
    req.app.locals.ordersService.send(req.body);
    res.status(200).end();
  } else {
    res.status(400).send('Request must have valid body');
  }
  res.end();
});

// usage example:
/* 
fetch('http://localhost:5001/api/dispatch', {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
    event: {
      type: 'ADD',
      order: {
        id: '1',
        delay: 1000,
        table: 101,
        meals: [
          { seat: 1, id: '11', dish: 'apples' },
          { seat: 2, id: '12', dish: 'bananas' },
          { seat: 3, id: '13', dish: 'grapes' },
        ],
      },
    },
  }),
})
  .then(console.log)
  .catch(console.error);
 */

module.exports = router;
