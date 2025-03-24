
// A simple mock email service
// In a real application, this would connect to an email service provider like SendGrid, Mailchimp, etc.

interface EmailDetails {
  to: string;
  from: string;
  subject: string;
  body: string;
}

class EmailService {
  private senderEmail = "care.ai.assistant@gmail.com";
  
  /**
   * Sends an email notification to the user
   * In a production environment, this would be replaced with an actual email API call
   */
  sendNotification(recipientEmail: string): Promise<boolean> {
    // Create email content
    const emailDetails: EmailDetails = {
      to: recipientEmail,
      from: this.senderEmail,
      subject: "Welcome to AI Technical Support Assistant",
      body: this.createWelcomeEmailBody(recipientEmail),
    };
    
    // In a real app, this would be an API call to an email service provider
    return new Promise((resolve) => {
      console.log("Sending email with the following details:");
      console.log(`From: ${emailDetails.from}`);
      console.log(`To: ${emailDetails.to}`);
      console.log(`Subject: ${emailDetails.subject}`);
      console.log(`Body: ${emailDetails.body.substring(0, 100)}...`);
      
      // Simulate successful API call
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
  
  /**
   * Creates the HTML body for the welcome email
   */
  private createWelcomeEmailBody(email: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #e11d48; margin-bottom: 10px;">Welcome to AI Technical Support Assistant!</h1>
          <p style="color: #4b5563; font-size: 16px;">Thank you for joining our waiting list.</p>
        </div>
        
        <div style="margin-bottom: 25px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
          <p style="margin-bottom: 15px; color: #1f2937;">Hello,</p>
          <p style="margin-bottom: 15px; color: #1f2937;">Thank you for pre-registering for our AI Technical Support Assistant. We're thrilled to have you join our community of early adopters!</p>
          <p style="margin-bottom: 15px; color: #1f2937;">Your email <strong>${email}</strong> has been added to our waiting list. You'll be among the first to know when we launch our beta version in July.</p>
          <p style="margin-bottom: 15px; color: #1f2937;">As a pre-registered user, you'll receive:</p>
          <ul style="color: #1f2937; padding-left: 20px;">
            <li>FREE access during our beta period</li>
            <li>Priority support from our team</li>
            <li>Exclusive early access to new features</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 20px; text-align: center;">
          <p style="margin-bottom: 15px; color: #1f2937;">We're working hard to create the most advanced AI-powered development assistant that helps you solve technical issues in seconds, not hours.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #6b7280; font-size: 14px;">
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>&copy; 2025 AI Technical Support Assistant. All rights reserved.</p>
        </div>
      </div>
    `;
  }
}

export const emailService = new EmailService();
