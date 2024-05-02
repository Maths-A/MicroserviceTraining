import React, { useState } from 'react';

const AccountManagement = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost/api/compte/users', { username, password, name, email, age });
      setResponse(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse(error.response.data.message);
    }
  };

  const handleUpdate = () => {
    // Logique pour mettre à jour un compte
    console.log('Mettre à jour le compte avec les données:', { username, password, name, email, age });
  };

  const handleDelete = () => {
    // Logique pour supprimer un compte
    console.log('Supprimer le compte avec le nom d\'utilisateur:', username);
  };

  const handleSearch = () => {
    // Logique pour rechercher un compte
    console.log('Rechercher le compte avec le nom d\'utilisateur:', username);
  };

  return (
    <div>
      <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

      <button onClick={handleSearch}>Rechercher</button>
      <button onClick={handleCreate}>Créer</button>
      <button onClick={handleUpdate}>Mettre à jour</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default AccountManagement;
