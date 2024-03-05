/* METODOS DE UM CONTROLLER:
   index: listagem das sessoes
   show: listar uma unica sessao
   update: atualizar uma sessao
   store: criar uma sessao
   destroy: deletar uma sessao
*/

import User from "../models/User"
import * as yup from 'yup'

class SessionController {
    async store(req, res) {
        const schema = yup.object().shape({
            email: yup.string().email().required()           
        })
        
        const { email } = req.body

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ error: 'Email inválido!' })
        }

        let user = await User.findOne({ email })

        if ( !user ) {
            user = await User.create({ email })
        }

        return res.json(user)
    }

}

export default new SessionController()