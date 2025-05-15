
import React from 'react';

interface ConfirmationEmailProps {
  name: string;
  confirmationLink: string;
}

const ConfirmationEmail = ({ name, confirmationLink }: ConfirmationEmailProps) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0' }}>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1 style={{ color: '#9b87f5' }}>AutoSearch</h1>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Confirmation de votre inscription</p>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '5px' }}>
        <p>Bonjour {name},</p>
        
        <p>Merci de vous être inscrit sur AutoSearch. Pour activer votre compte et commencer à utiliser notre service, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.</p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href={confirmationLink} 
            style={{ 
              backgroundColor: '#9b87f5', 
              color: '#ffffff', 
              padding: '12px 24px', 
              borderRadius: '4px', 
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
            Confirmer mon adresse email
          </a>
        </div>
        
        <p>Si vous n'avez pas créé de compte sur AutoSearch, vous pouvez ignorer ce message.</p>
        
        <p>Si le bouton ne fonctionne pas, vous pouvez également confirmer votre compte en copiant et collant l'URL suivante dans votre navigateur:</p>
        
        <p style={{ wordBreak: 'break-all', color: '#666666', fontSize: '12px' }}>{confirmationLink}</p>
      </div>
      
      <div style={{ marginTop: '20px', padding: '20px 0', borderTop: '1px solid #e0e0e0', fontSize: '12px', color: '#999999', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} AutoSearch. Tous droits réservés.</p>
        <p>123 Avenue des Champs-Élysées, 75008 Paris</p>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
