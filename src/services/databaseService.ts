
// A mock database service to store emails
// In a real application, this would connect to an actual database like Firebase, MongoDB, etc.

interface RegisteredUser {
  email: string;
  registeredAt: Date;
}

class DatabaseService {
  private users: RegisteredUser[] = [];
  private readonly storageKey = 'ai_assistant_registered_users';
  
  constructor() {
    this.loadUsersFromStorage();
  }
  
  /**
   * Stores a user email in the database
   * In a production environment, this would be replaced with an actual database call
   */
  storeEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // Normalize email (lowercase and trim)
        const normalizedEmail = email.toLowerCase().trim();
        
        // Check if email already exists
        const existingUser = this.users.find(user => user.email === normalizedEmail);
        
        if (!existingUser) {
          const newUser = {
            email: normalizedEmail,
            registeredAt: new Date()
          };
          
          this.users.push(newUser);
          this.saveUsersToStorage();
          
          console.log(`✅ New registration: ${normalizedEmail} at ${newUser.registeredAt.toLocaleString()}`);
          console.log(`📊 Total registrations: ${this.users.length}`);
          
          resolve(true);
        } else {
          console.log(`ℹ️ Duplicate registration attempt: ${normalizedEmail} (originally registered at ${existingUser.registeredAt.toLocaleString()})`);
          resolve(false);
        }
      } catch (error) {
        console.error('❌ Error storing email:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Returns all registered users
   */
  getRegisteredUsers(): RegisteredUser[] {
    return [...this.users];
  }
  
  /**
   * Returns the total count of registered users
   */
  getTotalRegisteredCount(): number {
    return this.users.length;
  }
  
  /**
   * Checks if an email is already registered
   */
  isEmailRegistered(email: string): boolean {
    const normalizedEmail = email.toLowerCase().trim();
    return this.users.some(user => user.email === normalizedEmail);
  }
  
  /**
   * Load users from localStorage (browser persistence)
   */
  private loadUsersFromStorage(): void {
    try {
      const storedUsers = localStorage.getItem(this.storageKey);
      if (storedUsers) {
        // Parse the stored users and convert date strings back to Date objects
        const parsedUsers = JSON.parse(storedUsers);
        this.users = parsedUsers.map((user: any) => ({
          ...user,
          registeredAt: new Date(user.registeredAt)
        }));
        console.log(`📋 Loaded ${this.users.length} registered users from storage`);
      }
    } catch (error) {
      console.error('❌ Error loading users from storage:', error);
      this.users = [];
    }
  }
  
  /**
   * Save users to localStorage (browser persistence)
   */
  private saveUsersToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    } catch (error) {
      console.error('❌ Error saving users to storage:', error);
    }
  }
}

export const databaseService = new DatabaseService();
