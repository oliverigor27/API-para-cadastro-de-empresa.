const bcrypt = require("bcryptjs")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          {
            name: "Igor Bomfim",
            email: "igorbomfim@gmail.com",
            password: bcrypt.hashSync("123456", 10)
          }
      ]);
    });
};
