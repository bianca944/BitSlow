// Signup page stub
import React, { useState } from 'react';
import bcrypt from 'bcryptjs'; // Pentru criptarea parolei

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password: hashedPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      alert('Înregistrare reușită!');
    } catch (error) {
      setError('Eroare la înregistrare');
    }
  };

  return (
    <div className="sign-up">
      <h2>Înregistrează-te</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmă Parola"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Înregistrează-te</button>
      </form>
    </div>
  );
};

export default SignUp;
