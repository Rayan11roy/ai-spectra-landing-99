
// A simple mock database service to store emails
// In a real application, this would connect to an actual database

interface RegisteredUser {
  email: string;
  registeredAt: Date;
}

class DatabaseService {
  private users: RegisteredUser[] = [];
  
  /**
   * Stores a user email in the database
   * In a production environment, this would be replaced with an actual database call
   */
  storeEmail(email: string): Promise<boolean> {
    // In a real app, this would be an API call to your backend
    return new Promise((resolve) => {
      // Check if email already exists
      const existingUser = this.users.find(user => user.email === email);
      
      if (!existingUser) {
        const newUser = {
          email,
          registeredAt: new Date()
        };
        
        this.users.push(newUser);
        console.log(`✅ New registration: ${email} at ${newUser.registeredAt.toLocaleString()}`);
        resolve(true);
      } else {
        console.log(`ℹ️ Duplicate registration attempt: ${email} (originally registered at ${existingUser.registeredAt.toLocaleString()})`);
        resolve(false);
      }
    });
  }
  
  /**
   * Returns all registered users
   */
  getRegisteredUsers(): RegisteredUser[] {
    return this.users;
  }
  
  /**
   * Returns the total count of registered users
   */
  getTotalRegisteredCount(): number {
    return this.users.length;
  }
}

export const databaseService = new DatabaseService();
