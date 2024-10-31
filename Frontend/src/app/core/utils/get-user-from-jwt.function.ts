import { UserDto } from './../services/models/user.model';
import { jwtDecode } from 'jwt-decode';

export function getUserFromJWT(): UserDto | null {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return null;
  }
  try {
    const tokenPayload: { id: string; username: string } = jwtDecode(authToken);

    const user: UserDto = {
      id: tokenPayload.id,
      username: tokenPayload.username,
    };

    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}
