const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const next = require('next')
// const session = require('express-session')
// const memoryStore = new session.MemoryStore()
// const Keycloak = require('keycloak-connect')
// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");
// const ws = require('ws')
// const { logger, requestLogger, errorLogger } = require('./api/lib/logging')
const API = require('./apiClient')
const config = require('./config.json')

const isDevelopment = process.env.NODE_ENV !== 'production'
const app = next({ dev: isDevelopment })
const nextHandler = app.getRequestHandler()

// Configure Sentry error tracking -- should be done as early as possible
if (config.sentryDSN) {
    Sentry.init({
        dsn: config.sentryDSN,
        environment: process.env.NODE_ENV
    });
}
else {
    console.log('Sentry is disabled')
}

// Configure the session store
// const pgSession = pgsimple(session)
// const sessionStore = new pgSession({
//     conString: `postgresql://${config.db.user ? config.db.user + '@' : ''}${config.db.host}:5432/${config.db.database}`, 
//     tableName: config.db.sessionTable,
//     ttl: config.session.ttl,
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
// })

// Configure the Keycloak client
// const keycloakClient = new Keycloak(
//     { store: memoryStore /*sessionStore*/ },
//     config.keycloak
// )

// Configure web socket server
// const wsServer = new ws.Server({ port: config.wsPort })
// const sockets = {}
// wsServer.on('connection', (ws, req) => {
//     const username = req.url.substr(1) //TODO consider using express-ws package for routing
//     console.log(`Connection from username=${username} ip=${req.connection.remoteAddress} key=${req.headers['sec-websocket-key']}`)

//     sockets[username] = ws

//     // ws.on('message', (message) => {
//     //     console.log('Socket received:', message)
//     // })

//     ws.send(JSON.stringify({ 
//         type: WS_CONNECTED,
//         data: {
//             key: req.headers['sec-websocket-key']
//         }
//     }))
// })

app.prepare()
    .then(() => {
        const server = express()

        // Setup logging
        // server.use(errorLogger)
        // server.use(requestLogger)

        // Setup Sentry error handling
        if (config.sentryDSN)
            server.use(Sentry.Handlers.requestHandler());

        // Support CORS requests
        server.use(cors())

        // Support JSON encoded request bodies
        server.use(bodyParser.json())

        // Configure sessions
        // server.use(
        //     session({
        //         store: sessionStore,
        //         secret: config.session.secret,
        //         resave: false,
        //         saveUninitialized: true,
        //         cookie: {
        //             secure: config.session.secureCookie,
        //         }
        //     })
        // )

        // Configure Express behind SSL proxy: https://expressjs.com/en/guide/behind-proxies.html 
        // Also set "proxy_set_header X-Forwarded-Proto https;" in NGINX config
        server.set('trust proxy', true)

        // Configure Keycloak
        //server.use(keycloakClient.middleware({ logout: '/logout' }))

        // Setup API client for use by getServerSideProps()
        server.use(async (req, _, next) => {
            const token = config.mockAPI ? { token: 'foo' } : null//getUserToken(req)
            req.api = new API({ 
                baseUrl: config.apiBaseUrl, 
                token: token ? token.token : null 
            })
            next()
        })

        // Save web socket handle
        // server.use((req, _, next) => {
        //     const username = getUserID(req)
        //     req.ws = sockets[username]
        //     next()
        // })

        server.get("*", (req, res) => { // all other pages
            return nextHandler(req, res)
        })

        // Catch errors
        if (config.sentryDSN)
            server.use(Sentry.Handlers.errorHandler());

        server.listen(config.port, (err) => {
            if (err) throw err
            if (isDevelopment)
                console.log('!!!!!!!!! RUNNING IN DEV MODE !!!!!!!!!!')
            console.log(`Ready on port ${config.port}`)
        })
    })
    .catch(exception => {
        logger.error(exception.stack)
        process.exit(1)
    })