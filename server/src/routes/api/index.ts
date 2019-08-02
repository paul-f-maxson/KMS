import debug from 'debug';
const log = debug('kms:api:log');
const error = debug('kms:api:error');

import { DispatchRequest } from 'kms-types';
import { Request, Response } from 'express';
import * as express from 'express';

const router = express.Router();

// Parse application/json from the body
router.use(express.json());

const isValidRequest = (req: any): req is DispatchRequest =>
  req.body && req.body.type && req.body.order;

// Forward body of the request to the machine as an event
router.post('/dispatch', (req: Request, res: Response) => {
  if (isValidRequest(req)) {
    log(`valid request recieved at /dispatch`);
    req.app.locals.ordersService.send(req.body);
    res.status(200).end();
  } else {
    error(
      `invalid request recieved at api/dispatch\n\trequest: ${JSON.stringify(
        req
      )}`
    );
    res.status(400).send('Invalid request');
  }
});

// usage example:
/* 
fetch('http://localhost:5001/api/dispatch', {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
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
  }),
})
  .then(console.log)
  .catch(console.error);
 */

router.all('/test', (req: Request, res: Response) => {
  req.app.locals.ordersService.send({
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
  });
  res.status(200).send('testing');
});

module.exports = router;
