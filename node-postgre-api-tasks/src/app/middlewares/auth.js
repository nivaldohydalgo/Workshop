// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';


export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token deve ser enviado!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log('decoded: ', decoded);

    // inserindo o id do token na requisicao
    req.userId = decoded.id;
    

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido!' });
  }

  return next();
};
