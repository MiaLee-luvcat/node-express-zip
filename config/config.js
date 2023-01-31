require('dotenv').config()

module.exports = {
  'development': {
    'username': process.env.MYSQL_DATABASE_USERNAME || 'root',
    'password': process.env.MYSQL_DATABASE_PASSWORD || null,
    'database': process.env.MYSQL_DATABASE_NAME || 'siri',
    'host': process.env.MYSQL_DATABASE_HOST || '127.0.0.1',
    'port': process.env.MYSQL_DATABASE_PORT || '3306',
    'dialect': 'mysql',
    'logging': false
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
}
