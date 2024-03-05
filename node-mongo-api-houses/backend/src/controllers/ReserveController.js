import Reserve from "../models/Reserve"
import User from "../models/User"
import House from "../models/House"

class ReserveController{

    async delete(req, res) {
        const { reserve_id } = req.body
        const reserve = await Reserve.deleteOne({ _id: reserve_id })
        return res.status(400).json({ message: 'Reserva excluída!' })
    }

    async index(req, res) {
        const { user_id } = req.headers
        const reserves = await Reserve.find({ user: user_id }).populate('house')
        return res.json(reserves)
        // res.status(200).json({ ok: true })
    }

    async store(req, res){

        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body


        // Validação da House
        const house = await House.findById(house_id)
        if ( !house ) {
            return res.status(400).json({ error: 'Essa casa não existe!' })
        }

        // Validação do status da House
        if ( house.status !== true ) {
            return res.status(400).json({ error: 'Não disponível para reserva!' })
        }

        // Validar se o usuário que quer reservar é o mesmo da house
        const user = await User.findById(user_id)
        if ( String(user._id) === String(house.user) ) {
            return res.status(401).json({ error: 'Reserva não permitida para o dono da house!' })
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        })

        // await reserve.populate('house').populate('user').execPopulate()

        res.json(reserve)
    } 
}

export default new ReserveController()
