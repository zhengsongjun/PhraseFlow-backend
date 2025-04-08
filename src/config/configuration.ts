export default () => ({
  PORT: parseInt(process.env.PORT || '3000', 10),
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'my_db',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
});
