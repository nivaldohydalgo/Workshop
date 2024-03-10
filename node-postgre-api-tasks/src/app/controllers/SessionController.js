// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Validando o email cadastrado
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não cadastrado!' });
    }

    // Validar a senha recebida
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha inválida!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // 1º parametro do jwt (payload):
      //     id do usuario
      // 2º parametro do jwt (senha secreta):
      //     usado o site "md5 online" para gerar uma
      //     senha secreta (secrets) com o texto "nivaldo hydalgo"
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
