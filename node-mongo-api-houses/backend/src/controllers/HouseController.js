import House from "../models/House"
import User from "../models/User"

import * as yup from 'yup'

class HouseController {
    
    //==== CONSULTA CASAS ====
    async index(req, res) {
        const { status } = req.query
        const houses = await House.find({ status })
        return res.json(houses)
    }

    //==== INCLUSÃO DE UMA CASA ====
    async store(req, res) {
        // validação dos dados com yup
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })

        const { filename } = req.file
        const { description, 
            price, 
            location, 
            status } = req.body
        const { user_id } = req.headers

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ error: 'Dados invalidos!' })
        }



        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })

        return res.json(house)
    }

    async update(req, res){
        // validação dos dados com yup
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })



        const { filename } = req.file
        const { id } = req.params
        const { description, 
            price, 
            location, 
            status } = req.body
        const { user_id } = req.headers

        if ( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ error: 'Dados invalidos!' })
        }



        // Validação do usuario
        const user = await User.findById(user_id)
        const house = await House.findById(id)
        if ( String(user._id) !== String(house.user) ) {
            return res.status(401).json({ error: 'Usuário não autorizado!' })
        }
        // Update da casa
        await House.updateOne({ _id: id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })
        return res.send()
    }

    async delete(req, res){
        const { house_id } = req.body
        const { user_id } = req.headers
        // Validação do usuario
        // const user = await User.findById(user_id)
        const house = await House.findById(house_id)
        if ( String(user_id) !== String(house.user) ) {
            return res.status(401).json({ error: 'Usuário não autorizado!' })
        }
        // Deleta a House
        await House.findByIdAndDelete({ _id: house_id })
        res.json({ messge: "House excluída com sucesso!" })
    }

}

export default new HouseController()
