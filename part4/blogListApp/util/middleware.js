const logger = require('./logger')

const requestLogger = (req,res,next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('body:',req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req,res) => {
    res.status(404).send({error: 'Unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if(err.name === 'CastError'){
        return res.status(400).send({error:'malformed id'})
    }else if(err.name === 'ValidationError'){
        return res.status(400).json({error: err.message})
    }else if (err.name ===  'JsonWebTokenError') {
        return res.status(400).json({ error: 'token missing or invalid' })
      }
    
}

module.exports ={
    requestLogger,
    unknownEndpoint,
    errorHandler
}