export const translations = {
  fr: {
    errorMessage: {
      userNotFound: "L'utilisateur n'a pas été trouvé",
      userId: "Un nom d'utilisateur est requis",
      password: "Un mot de passe est requis",
      userIdError: "Il y a une erreur avec le nom d'utilisateur",
      passwordError: "Il y a une erreur avec le mot de passe",
      userIdTooLong: "Le nom d'utilisateur doit faire au maximum 15 caractères",
      passwordTooLong: "Le mot de passe doit faire au maximum 15 caractères",
      passwordTooShort: "Le mot de passe doit faire au minimum 6 caractères",
      userCreationFailed: "L'utilisateur n'a pas pu être créé",
    },
  },
  en: {
    errorMessage: {
      userNotFound: "User not found",
      userId: "User ID is required",
      password: "Password is required",
      userIdError: "Error with User ID",
      passwordError: "Error with Password",
      userIdTooLong: "User ID must be at most 15 characters long",
      passwordTooLong: "Password must be at most 15 characters long",
      passwordTooShort: "Password must be at least 6 characters long",
      userCreationFailed: "User could not be created",
    },
  },
} as const;

export type Translation = typeof translations.fr;
