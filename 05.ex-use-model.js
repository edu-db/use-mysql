
( async () => {
    try {
        const model = require('./04.ex-model')
        const types = ["product","producer","location"]
        
        await Promise.all(types.map( async type => {
            const data = await model.findAll(type)
            console.log(type, data)
        }))

        model.pool.end();

    } catch (e) {
        console.error(e.toString())
    }
    

})()




