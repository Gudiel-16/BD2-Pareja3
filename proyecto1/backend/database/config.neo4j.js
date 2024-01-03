const neo4j = require('neo4j-driver');

function createDriver() {
  return neo4j.driver(process.env.DB_NEO4J_URI, neo4j.auth.basic(process.env.DB_NEO4J_USER, process.env.DB_NEO4J_PASSWORD));
}

module.exports = createDriver;