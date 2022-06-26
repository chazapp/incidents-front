import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
            // cypress-dotenv doesnt work with cypress 10 so moving plugin code here.
            const cypressPrefix = 'CYPRESS_'

            // load the content of the .env file, then parse each variable to the correct type (string, number, boolean, etc.)
            let envVars = require('dotenv').config()
      
            // if no env vars were parsed, then there is nothing to do here (most likely an empty or non-existing .env file)
            if (envVars.parsed === undefined) {
              return config
            }
      
            const dotenvParseVariables = require('dotenv-parse-variables')
            envVars = dotenvParseVariables(envVars.parsed)
      
            // get the name of all env vars that relate to cypress
            const cypressEnvVarKeys = false
              ? Object.keys(envVars)
              : Object.keys(envVars).filter((envName) => envName.startsWith(cypressPrefix))
            const camelCase = require("camelcase");
            cypressEnvVarKeys.forEach((originalName) => {
              const pattern = new RegExp(`^${cypressPrefix}`, 'g')
              const cleanName = originalName.replace(pattern, '')
              const camelCaseName = camelCase(cleanName)
              const parsedEnvar = envVars[originalName]
              const processEnvVar = process.env[originalName]
              const envVar = typeof parsedEnvar === 'string' ? processEnvVar : parsedEnvar
      
              config.env[cleanName] = envVar
      
              if (config.hasOwnProperty(camelCaseName) && camelCaseName !== 'env') {
                config[camelCaseName] = envVar
              }
            })
      
            return config
    },
    experimentalSessionAndOrigin: true,
  },
});
