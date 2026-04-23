from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, database
import smtplib
from email.mime.text import MIMEText
import os

router = APIRouter()

def send_email_stub(to_email: str, subject: str, message: str):
    # This is a stub for an actual SMTP implementation
    # In production, use os.getenv for SMTP_SERVER, PORT, USER, PASS
    print(f"DEBUG EMAIL to {to_email}: {subject}\n{message}")
    
    # Example logic:
    # msg = MIMEText(message)
    # msg['Subject'] = subject
    # msg['From'] = "noreply@sarvam.digital"
    # msg['To'] = to_email
    # ... smtplib logic ...

@router.post("/submit")
def submit_contact(contact: schemas.ContactCreate, db: Session = Depends(database.get_db)):
    # 1. Store in database
    new_submission = models.ContactSubmission(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        message=contact.message
    )
    db.add(new_submission)
    db.commit()
    
    # 2. Trigger Emails (Stubs)
    # To Admin
    admin_body = f"New Lead: {contact.name}\nEmail: {contact.email}\nPhone: {contact.phone}\nMessage: {contact.message}"
    send_email_stub("admin@sarvam.digital", "New Contact Form Submission", admin_body)
    
    # To User
    user_body = f"Hi {contact.name},\n\nThank you for reaching out to Sarvam Digital. We have received your message and will get back to you shortly."
    send_email_stub(contact.email, "Thank you for contacting Sarvam Digital", user_body)
    
    return {"message": "Form submitted successfully"}
