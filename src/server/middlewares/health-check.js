export default (req, res) => {
  res.status(200);
  if (!req.accepts('txt') && req.accepts('json')) {
    return res.json({
      ping: 'PONG',
    });
  }

  res.type('txt');
  return res.send('PONG');
};
