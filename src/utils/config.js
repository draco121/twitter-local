const config = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:49155',
  DATABASE_USER: process.env.DATABASE_USER || 'docker',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'mongopw',
  DATABASE_AUTH_SOURCE: process.env.DATABASE_AUTH_SOURCE || 'admin',
  SERVER_PORT: process.env.PORT || 4200,
  SECRET_KEY: process.env.SECRET_KEY || 'JAI__MATA__DI',
  REDIS_URL: process.env.REDIS_URL || 'redis://default:redispw@localhost:6379',
};

module.exports = config;
