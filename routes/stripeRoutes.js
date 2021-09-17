const { payment } = require('../controllers/stripePaymentController');

const router = require('express').Router();

router.post('/payments', payment);

module.exports = router;
