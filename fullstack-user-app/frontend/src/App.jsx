import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  
    useEffect(() => {
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  fetchUsers();
}, []);


  const submitUser = async () => {
    if (!form.name || !form.email || !form.age) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await fetch(`http://localhost:5000/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditId(null);
    } else {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const editUser = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>👤 User Management System</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Age"
        type="number"
        value={form.age}
        onChange={e => setForm({ ...form, age: e.target.value })}
      />

      <button className="add-btn" onClick={submitUser}>
        {editId ? "Update User" : "Add User"}
      </button>

      {users.map(user => (
        <div className="user-card" key={user.id}>
          <div className="user-info">
            <strong>{user.name}</strong><br />
            {user.email} | Age: {user.age}
          </div>
          <div>
            <button className="edit-btn" onClick={() => editUser(user)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;