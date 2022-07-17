import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import UserCard from './components/UserCard';
import EditModal from './components/EditModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [editUser, setEditUser] = useState({});

  const [editModalOpen, setEditModalOpen] = useState(false);

  function editOldUser(userIndex) {
    const filteredUsers = users.filter((_, i) => i === userIndex);
    const filtered = filteredUsers[0]
    editUser.firstName = filtered.firstName;
    editUser.lastName = filtered.lastName;
    editUser.email = filtered.email;
    editUser.age = filtered.age;
    editUser.id = filtered['_id'];
    }

  function handleEditedUser() {
    setUsers([
      ...users
    ]);
  }


  function handleNewUser(newUserValue) {
    setUsers([
      ...users,
      newUserValue
    ]);
  }

  function removeOldUser(userIndex) {
    const filteredUsers = users.filter((_, i) => i !== userIndex);
    setUsers(filteredUsers);
  }

  useEffect(() => {
    async function fetchDataFromDb() {
      await fetch("http://localhost:9000/all-users")
        .then((resp) => resp.json())
        .then((result) => setUsers(result)
        );
    }
    fetchDataFromDb();
  }, []);

  function callEditUserModal() {
    setEditModalOpen(true)
  }

  return (
    <div className="App">
      <Header />
      <nav className='navigation'>
        {editModalOpen && <EditModal
          name={editUser.firstName}
          surname={editUser.lastName}
          email={editUser.email}
          age={editUser.age}
          id={editUser.id}
          editUserData={handleEditedUser}
          setOpenModal={setEditModalOpen}
          addNewUser={handleEditedUser}
          editUserValue={editOldUser}
        />}
        {modalOpen && <Modal
          addNewUser={handleNewUser}
          setOpenModal={setModalOpen}
        />}
        <button 
        onClick={() => {
          setModalOpen(true);
        }} className='navigation__item btn'>Registruokis ČIA !</button>
      </nav>
      <main className='main-container'>
        <h2>Šventėje dalyvaus...</h2>
        
        <table className='table'>
          <thead>
            <tr>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>El. paštas</th>
              <th>Amžius</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserCard
                editUserCall={callEditUserModal}
                userIndex={index}
                editUserValue={editOldUser}
                removeUser={removeOldUser}
                id={user['_id']}
                key={index}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                age={user.age}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
