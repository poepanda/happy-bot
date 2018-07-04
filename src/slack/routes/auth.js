import _ from 'lodash';

const debug = require('debug')('happy:slack:auth');

/**
 * Save the authenticated (slack) team into db and ready for interacting
 * @param {botkit} controller
 * @param {authenticated team info} payload
 */
const saveAuth = (controller, payload) => {
  debug('Auth successfully!', payload);

  if (!payload.identity.team_id) {
    debug('Error: Received an oauth response without team id!', payload);
  }

  controller.storage.teams.get(payload.identity.team_id, (err, result) => {
    let team = result ? _.assign({}, result) : null;
    debug('TEAM....', team);
    if (err) {
      debug('Error: Could not load team from storage system', payload.identity.team_id);
    }

    let newTeam = false;
    if (!team) {
      team = {
        id: payload.identity.team_id,
        createdBy: payload.identity.user_id,
        url: payload.identity.url,
        name: payload.identity.team,
      };
      newTeam = true;
    }

    team.bot = {
      token: payload.bot.bot_access_token,
      user_id: payload.bot.bot_user_id,
      createdBy: payload.identity.user_id,
      app_token: payload.access_token,
    };

    const testBot = controller.spawn(team.bot);
    testBot.api.auth.test({}, (testBotError, botAuth) => {
      if (testBotError) {
        debug('Error: Could not authenticate bot user', err);
      }
      team.bot.name = botAuth.user;

      testBot.identity = botAuth;

      testBot.identity.id = botAuth.user_id;
      testBot.identity.name = botAuth.user;

      testBot.team_info = team;

      controller.storage.teams.save(team, (teamSaveErr) => {
        if (teamSaveErr) {
          debug('Error: Could not save the team record ', teamSaveErr);
        }
        if (newTeam) {
          controller.trigger('sayHi', [testBot]);
        }
      });
    });
  });
};

/**
 * /slack/login handler: Allow user to login the app into slack
 * @param {*} controller: Botkit controller
 */
const slackLogin = controller => (req, res) => {
  res.redirect(controller.getAuthorizeURL());
};

/**
 * /slack/oauth handler: callback from slack oauth
 * @param {botkit} controller
 */
const slackOauth = controller => (req, res) => {
  const { code, state } = req.query;
  const { clientId, clientSecret } = controller.config;

  debug('state', state);

  // we need to use the Slack API, so spawn a generic bot with no token
  const slack = controller.spawn({});

  const opts = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
  };

  slack.api.oauth.access(opts, (err, auth) => {
    if (err) {
      debug('Error confirming oauth', err);
      return res.send('error');
    }

    const authData = _.assign({}, auth);

    const scopes = authData.scope.split(',');
    debug('Scope we have: ', scopes);

    return slack.api.auth.test({ token: authData.access_token }, (testErr, identity) => {
      if (testErr) {
        debug('Error fetching user identity', err);
        return res.send('error');
      }

      authData.identity = identity;
      saveAuth(controller, authData);

      res.cookie('team_id', authData.team_id);
      res.cookie('bot_user_id', authData.bot.bot_user_id);
      return res.send('Success!');
    });
  });
};

export default function attachAuthRoutes(app, controller) {
  app.get('/slack/login', slackLogin(controller));

  app.get('/slack/oauth', slackOauth(controller));
}
