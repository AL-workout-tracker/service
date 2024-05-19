import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mssql',
  connections: {
    mssql: {
      client: 'mssql',
      connection: {
        server: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        options: {
          encrypt: true, // Utilisé pour Azure SQL
          trustServerCertificate: false, // Utilisé pour Azure SQL
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
