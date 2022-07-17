import React, { useState } from 'react';
import './Navigation.css';
import Modal from './Modal';

export default function Navigation(props) {

    const [modalOpen, setModalOpen] = useState(false);
    const [newUser, setNewUser] = useState()

    return (
        <nav className='navigation'>
            {modalOpen && <Modal addToDo={props.addToDo} setOpenModal={setModalOpen} />}
            <span onClick={() => {
          setModalOpen(true);
        }} className='navigation__item'>Registracijos forma</span>
        </nav>
    )
}