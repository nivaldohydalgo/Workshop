const prompt = require('prompt')
const colors = require('@colors/colors/safe') 

let user = {}

prompt.message = colors.hidden()
//prompt.delimiter = colors.green('><')

prompt.start()

schema = {
    properties: {
        name: {
            description: colors.blue('User......'),
            required: true
        },
        password: {
            description: colors.blue('Password..'),
            required: true,
            hidden: true,
            replace: '*'
        }
    }
}

prompt.get(schema, (err, result) => {
    user = result
    console.log('Credenciais:', user)
})


