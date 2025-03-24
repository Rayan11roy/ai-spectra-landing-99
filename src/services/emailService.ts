
// A simple mock email service
// In a real application, this would connect to an email service provider

class EmailService {
  sendNotification(email: string): Promise<boolean> {
    // In a real app, this would be an API call to an email service
    return new Promise((resolve) => {
      console.log(`Email notification sent to: ${email}`);
      // Simulate successful API call
      resolve(true);
    });
  }
}

export const emailService = new EmailService();
