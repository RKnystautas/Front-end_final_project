import { useState } from 'react';
import React from "react";
import "./Modal.css";
import "./Registration.css";

function Modal(props) {
    const { setOpenModal, addNewUser, name, surname, email, age, id } = props;

    const [nameValue, setNameValue] = useState(name)
    const [surnameValue, setSurnameValue] = useState(surname)
    const [emailValue, setEmailValue] = useState(email)
    const [ageValue, setAgeValue] = useState(age)

    function editUserData(e) {
        addNewUser();
    }
    const editUserInfo = () => {
        const requestOptions = {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id,
                "firstName": nameValue,
                "lastName": surnameValue,
                "email": emailValue,
                "age": ageValue,
            }),
        };
        fetch('http://localhost:9000/all-users/' + id, requestOptions);
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="body">
                    <div>
                        <form className='registration-form'
                            onSubmit={e => {
                                e.preventDefault();
                                if (e.target[3].value > 0) {
                                    console.log(e.target[0].value)
                                    setNameValue(e.target[0].value)
                                    setSurnameValue(e.target[1].value)
                                    setEmailValue(e.target[2].value)
                                    setAgeValue(e.target[3].value)
                                    setOpenModal(false);
                                    editUserInfo();
                                    editUserData();
                                }
                            }}
                        >
                            <h3>Dalyvio duomenų atnaujinimo forma</h3>
                            <div className='registration-form__inputs'>
                                <label className='registration-form__label'>Vardas
                                    <input type='text' name="first-name" value={nameValue}
                                        placeholder='Dalyvio vardas...'
                                        onChange={(event) => setNameValue(event.target.value)}></input>
                                </label>
                                <label className='registration-form__label'>Pavardė
                                    <input type='text' name="last-name" value={surnameValue}
                                        placeholder='Dalyvio vardas...'
                                        onChange={(event) => setSurnameValue(event.target.value)}></input>
                                </label>
                                <label className='registration-form__label'>Elektroninis paštas
                                    <input type='email' name="email" value={emailValue}
                                        placeholder='Dalyvio el.paštas...'
                                        onChange={(event) => setEmailValue(event.target.value)}></input>
                                </label>
                                <label className='registration-form__label'>Amžius
                                    <input type='number' name="age" value={Number(ageValue)}
                                        placeholder='Dalyvio amžius...'
                                        onChange={(event) => setAgeValue(event.target.value)}></input>
                                </label>
                                <div className="titleCloseBtn">
                                    <button onClick={() => setOpenModal(false)} id="cancelBtn">
                                        Atšaukti
                                    </button>
                                    <button>Išsaugoti</button>
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




/* function editUserInfo() {
        const requestOptions = {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id,
                "firstName": editUser.firstName,
                "lastName": editUser.lastName,
                "email": editUser.email,
                "age": editUser.age,
            }),
        };
        console.log("requestOptions.body: " + requestOptions.body)
        console.log("id: " + id)
        fetch('http://localhost:9000/all-users/' + id, requestOptions)
            .then(response => response.json())
        // const data = await requestResponse.json();
        // console.log(data[0].acknowledged)
    } */