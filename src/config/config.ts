export default () => ({
  database: {
    uri: process.env.DATABASE_URI,
  },
  server: {
    port: process.env.PORT,
  },
});
