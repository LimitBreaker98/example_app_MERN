const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) { //!origin to allow non web apps to use our api.
      callback(null, true) // (error of type Object, allowed of type Boolean)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
}

module.exports = corsOptions