import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

export default router;