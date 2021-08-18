const yup = require("yup");

exports.usersSchema = yup.object({
  name: yup
    .string("NAME é do tipo string")
    .required("Necessário informar o NAME"),
  username: yup
    .string("USERNAME é do tipo string")
    .required("Necessário informar o USERNAME"),
  email: yup
    .string("EMAIL é do tipo string")
    .required("Necessário informar o EMAIL"),
  password: yup
    .string("PASSWORD é do tipo string")
    .required("Nessário informar o PASSWORD")
    .min(6, "PASSWORD precisa ter no mínimo 6 caracteres"),
  admin: yup.boolean("ADMIN é do tipo boolean").optional(),
  status: yup.boolean("STATUS é do tipo boolean").optional(),
  token: yup.string("TOKEN é do tipo string").optional(),
});
