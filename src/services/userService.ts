import * as userRepository from '../repositories/userRepository';

export async function deleteUser(userId: number) {
  await userRepository.deleteUserAndCredentials(userId);
}
