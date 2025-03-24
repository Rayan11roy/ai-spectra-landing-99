
// A simple mock database service to store emails
// In a real application, this would connect to an actual database

interface RegisteredUser {
  email: string;
  registeredAt: Date;
}

class DatabaseService {
  private users: RegisteredUser[] = [];
  
  storeEmail(email: string): Promise<boolean> {
    // In a real app, this would be an API call to your backend
    return new Promise((resolve) => {
      // Check if email already exists
      const existingUser = this.users.find(user => user.email === email);
      
      if (!existingUser) {
        this.users.push({
          email,
          registeredAt: new Date()
        });
        console.log('User stored in database:', email);
        resolve(true);
      } else {
        console.log('User already registered:', email);
        resolve(false);
      }
    });
  }
  
  getRegisteredUsers(): RegisteredUser[] {
    return this.users;
  }
}

export const databaseService = new DatabaseService();
