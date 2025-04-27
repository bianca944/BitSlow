// SignUpForm component stub
import React, { useState } from "react";

// Funcția principală pentru formularul de înregistrare
const SignUpForm: React.FC = () => {
  // State pentru fiecare câmp din formular
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Funcția de validare a formularului
  const validateForm = () => {
    if (!name || !email || !password) {
      setError("Toate câmpurile sunt obligatorii.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Te rog introdu un email valid.");
      return false;
    }
    if (password.length < 6) {
      setError("Parola trebuie să aibă cel puțin 6 caractere.");
      return false;
    }
    setError("");
    return true;
  };

  // Funcția de trimitere a formularului
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificăm dacă formularul este valid
    if (!validateForm()) {
      return;
    }

    try {
      // Trimitem datele la backend pentru a crea un utilizator nou
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Afișăm un mesaj de succes sau redirecționăm utilizatorul
        alert("Înregistrare cu succes!");
      } else {
        setError("A apărut o eroare. Te rugăm să încerci din nou.");
      }
    } catch (error) {
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="text-center text-xl mb-4">Înregistrare utilizator</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nume
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Parolă
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Afișarea erorilor */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Înregistrează-te
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
