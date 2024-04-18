const fastify = require('fastify')({ logger: true })
const path = require('node:path')

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../dist'),
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})
