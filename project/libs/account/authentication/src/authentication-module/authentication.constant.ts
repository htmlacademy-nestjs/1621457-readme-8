export const AuthenticationMessage = {
  Auth_User_Exits: 'User with this email exists',
  Auth_User_Not_Found: 'User not found',
  Auth_User_Password_Wrong: 'User password is wrong',
} as const;


export const AuthenticationResponseMessage = {
    LoggedSuccess: 'User has been successfully logged.',
    LoggedError: 'Password or Login is wrong.',
    UserFound: 'User found',
    UserNotFound: 'User not found',
    UserExist: 'User with the email already exists',
    UserCreated: 'The new user has been successfully created.',
  } as const;