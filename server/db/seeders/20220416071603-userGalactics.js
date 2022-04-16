'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        firstName: 'Galactic',
        lastName: 'User',
        email: 'user@galactic.ru',
        password: '$2b$10$dSXFVV4iqnR/zZ6fJlkBD.Qp1.xjZZ.PL1bIzupOt.XvqpyUqafnS',
        phone: '8922777777',
        avatarUrl: 'userAvatar',
        isAdmin: false,
        isMaker: false,
        isCreator: false,
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        {
        firstName: 'Galactic',
        lastName: 'Admin',
        email: 'admin@galactic.ru',
        password: '$2b$10$Mj0v/vi7BE4nZP.J4hwc5.oNiuLO2eXm8QUoLe8ilMwCxpzfSG8gS',
        phone: '892222222',
        avatarUrl: 'adminAvatar',
        isAdmin: true,
        isMaker: true,
        isCreator: true,
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        {
        firstName: 'Galactic',
        lastName: 'Maker',
        email: 'maker@galactic.ru',
        password: '$2b$10$5kTiluN7zDaw0REtBEEXE.BJQsJlUvC./iFCudnHkRZtbzO/R96RC',
        phone: '8922333333',
        avatarUrl: 'makerAvatar',
        isAdmin: false,
        isMaker: true,
        isCreator: false,
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        {
        firstName: 'Galactic',
        lastName: 'Creator',
        email: 'creator@galactic.ru',
        password: '$2b$10$00IroH9snL6nQJq0ku4.7upk9.pyidJlCE72A4D80yTCCOfmK1fYm',
        phone: '8922777777',
        avatarUrl: 'userAvatar',
        isAdmin: false,
        isMaker: false,
        isCreator: true,
        isActivated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
