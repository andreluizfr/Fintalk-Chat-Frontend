import { addMethod, string, date, object, InferType } from 'yup';

addMethod(string, 'password', function (message) {
  return this.test('password', message, function (value) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,128}$/;
    /*
      /^
        (?=.*\d)                      // deve conter ao menos um dígito
        (?=.* [a - z])                // deve conter ao menos uma letra minúscula
        (?=.* [A - Z])                // deve conter ao menos uma letra maiúscula
        (?=.* [$ *& @#])              // deve conter ao menos um caractere especial
        [0 - 9a-zA - Z$ *& @#]{ 8,}   // deve conter ao menos 8 dos caracteres mencionados
      $/
    */
    if (value !== undefined && passwordRegex.test(value))
      return true;

    return this.createError({
      path: this.path,
      message: message || 'O valor não é válido.'
    });
  });
});

const userRegisteringSchema = object({
  name: string().required("O campo nome é requerido.").max(128, "O campo nome possui um limite de 128 caracteres."),
  email: string().required("O campo email é requerido.").email("O campo e-mail não está com um valor válido.").max(128, "O campo e-mail possui um limite de 128 caracteres."),
  password: string().password("Sua senha deve possuir pelo menos 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 8 caracteres e 128 caracteres no máximo."),
  birthdate: date().required("O campo da data de nascimento é requerido."),
});

export { userRegisteringSchema };

export type UserRegistering = InferType<typeof userRegisteringSchema>;