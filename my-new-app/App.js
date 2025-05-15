import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView } from 'react-native';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName('');
        fetchUsers();
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>User List</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          )}
        />
      )}
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          marginVertical: 8,
          padding: 8,
        }}
      />
      <Button title="Add User" onPress={addUser} />
    </SafeAreaView>
  );
};

export default App;


