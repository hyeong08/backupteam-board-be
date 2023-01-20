
const jwtConfig = {
  secretKey: 'YoUrSeCrEtKeY',
  options: {
    algorithm: 'HS256',
    expiresIn: '30m',
    issuer: 'hs',
  }
}

const corsOptions = {
  origin: 'http://localhost:7000',
  credentials: true,
}

module.exports = { jwtConfig, corsOptions }