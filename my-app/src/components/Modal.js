import { useState } from 'react';
import React from "react";
import "./Modal.css";
import "./Registration.css";

function Modal(props) {
  const { setOpenModal, addNewUser } = props;
  const [newUser, setNewUser] = useState({});

  function handleNewUser(e) {
    addNewUser(newUser);
    setNewUser([]);
  }

  const createNewUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        age: newUser.age,
      })
    };
    console.log(requestOptions)
    fetch('http://localhost:9000/new-user', requestOptions);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
          <div>
            <form className='registration-form'
              onSubmit={e => {
                e.preventDefault();
                if (e.target[3].value > 0) {
                  newUser.firstName = e.target[0].value;
                  newUser.lastName = e.target[1].value;
                  newUser.email = e.target[2].value;
                  newUser.age = e.target[3].value;
                  setOpenModal(false);
                  createNewUser();
                  handleNewUser();
                }
              }}
            >
              <h3>Dalyvio registracijos forma</h3>
              <div className='registration-form__inputs'>
                <label className='registration-form__label'>Vardas
                  <input type='text' name="first-name" placeholder='Dalyvio vardas...'></input>
                </label>
                <label className='registration-form__label'>Pavardė
                  <input type='text' name="last-name" placeholder='Dalyvio vardas...'></input>
                </label>
                <label className='registration-form__label'>Elektroninis paštas
                  <input type='email' name="email" placeholder='Dalyvio el.paštas...'></input>
                </label>
                <label className='registration-form__label'>Amžius
                  <input type='number' name="age" placeholder='Dalyvio amžius...'></input>
                </label>
                <div className="titleCloseBtn">
                  <button onClick={() => setOpenModal(false)} id="cancelBtn">
                    Atšaukti
                  </button>
                  <button className='reg_btn'>Registruoti</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;