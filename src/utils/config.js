const config = {
  DATABASE_URL: 'mongodb://localhost:49155/test?authSource=test&w=1',
  DATABASE_USER: 'docker',
  DATABASE_PASSWORD: 'mongopw',
  DATABASE_AUTH_SOURCE: 'admin',
  SERVER_PORT: 8000|process.env.PORT,
  SECRET_KEY: 'JAI__MATA__DI',
  REDIS_URL: 'redis://default:redispw@localhost:49153',
};

module.exports = config;
