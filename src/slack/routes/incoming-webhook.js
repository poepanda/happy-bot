export default (app, controller) => {
  app.post('/slack/receive', (req, res) => {
    res.status(200);
    controller.handleWebhookPayload(req, res);
  });
};
