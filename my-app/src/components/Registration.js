import './Registration.css'
export default function Registration() {

    

    return (
        <div>
            <form className='registration-form'>
                <h3>Dalyvio registracijos forma</h3>
                <div className='registration-form__inputs'>
                <label className='registration-form__label'>Vardas
                    <input type='text' placeholder='Dalyvio vardas...'></input>
                </label>
                <label className='registration-form__label'>Pavardė
                    <input type='text' placeholder='Dalyvio vardas...'></input>
                </label>
                <label className='registration-form__label'>Elektroninis paštas
                    <input type='email' placeholder='Dalyvio el.paštas...'></input>
                </label>
                <label className='registration-form__label'>Amžius
                    <input type='number' placeholder='Dalyvio amžius...'></input>
                </label>   
                </div> 
            </form>
        </div>
    )
}