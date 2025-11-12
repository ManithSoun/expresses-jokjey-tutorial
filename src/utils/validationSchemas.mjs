export const createUserValidationSchema = {
  username: {
    in: ['body'],
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must  be at least 5-32 Characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },

  displayName: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Display Name must not be empty",
    },
  },
};

export const filterValidationSchema = {
    filter: {
        in: ['query'],
        optional: true,
        isString: true,
        notEmpty: {
          errorMessage: "Must not be empty",
        },
        isLength: {
          options: {
            min: 3,
            max: 10,
          },
          errorMessage: "Must be at least 3-10 Characters",
        },
      },
}