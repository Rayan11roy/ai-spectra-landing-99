
// Email service using EmailJS for sending actual emails
import emailjs from 'emailjs-com';

interface EmailDetails {
  to: string;
  from: string;
  subject: string;
  body: string;
}

class EmailService {
  private senderEmail = "care.ai.assistant@gmail.com";
  private readonly SERVICE_ID = "service_ai_assistant"; // Your EmailJS service ID
  private readonly TEMPLATE_ID = "template_welcome"; // Your EmailJS template ID
  private readonly USER_ID = "YOUR_USER_ID"; // Your EmailJS user ID
  
  constructor() {
    // Initialize EmailJS with your User ID
    emailjs.init(this.USER_ID);
  }

  /**
   * Sends an email notification to the user using EmailJS
   */
  sendNotification(recipientEmail: string): Promise<boolean> {
    console.log(`Attempting to send email to: ${recipientEmail}`);
    
    // Create template parameters
    const templateParams = {
      to_email: recipientEmail,
      from_email: this.senderEmail,
      subject: "Welcome to AI Technical Support Assistant",
      message: this.createPlainTextEmail(recipientEmail),
      html_message: this.createWelcomeEmailBody(recipientEmail)
    };
    
    // For development/demo purposes, we'll log the email details
    this.logEmailDetails(templateParams);
    
    // In development mode, we'll simulate sending for testing
    if (process.env.NODE_ENV === 'development' || !this.isConfigured()) {
      console.log("⚠️ Running in development mode or EmailJS not configured.");
      console.log("✓ Email sending simulated successfully");
      return Promise.resolve(true);
    }
    
    // Send the email using EmailJS
    return emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
      .then(response => {
        console.log("✓ Email sent successfully:", response.status, response.text);
        return true;
      })
      .catch(error => {
        console.error("✗ Failed to send email:", error);
        return false;
      });
  }
  
  /**
   * Check if EmailJS is configured properly
   */
  private isConfigured(): boolean {
    return this.USER_ID !== "YOUR_USER_ID" && 
           this.SERVICE_ID !== "service_ai_assistant" && 
           this.TEMPLATE_ID !== "template_welcome";
  }
  
  /**
   * Logs email details for debugging
   */
  private logEmailDetails(params: any): void {
    console.log("📧 Email Details 📧");
    console.log(`From: ${this.senderEmail}`);
    console.log(`To: ${params.to_email}`);
    console.log(`Subject: ${params.subject}`);
    console.log(`Body preview: ${params.message.substring(0, 100)}...`);
  }
  
  /**
   * Creates a plain text version of the email for clients that don't support HTML
   */
  private createPlainTextEmail(email: string): string {
    return `
    Welcome to AI Technical Support Assistant!
    
    Thank you for joining our waiting list.
    
    Hello,
    
    Thank you for pre-registering for our AI Technical Support Assistant. We're thrilled to have you join our community of early adopters!
    
    Your email ${email} has been added to our waiting list. You'll be among the first to know when we launch our beta version in July.
    
    As a pre-registered user, you'll receive:
    - FREE access during our beta period
    - Priority support from our team
    - Exclusive early access to new features
    
    We're working hard to create the most advanced AI-powered development assistant that helps you solve technical issues in seconds, not hours.
    
    If you have any questions, feel free to reply to this email.
    
    © 2025 AI Technical Support Assistant. All rights reserved.
    `;
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
