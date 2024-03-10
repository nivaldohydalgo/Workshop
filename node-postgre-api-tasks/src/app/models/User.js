import Sequelize, { Model } from 'sequelize';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        // o 6 é a força do encrypt, se colocar numero muito alto pode ficar pesado para o servidor
        user.password_hash = await bcrypt.hash(user.password, 6);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
