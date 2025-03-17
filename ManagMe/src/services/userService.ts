import { User } from '../models/User';

class UserService {
  private currentUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe'
  };

  getCurrentUser(): User {
    return this.currentUser;
  }
}

export default new UserService();