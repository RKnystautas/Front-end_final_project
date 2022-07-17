import './UserCard.css'


export default function UserCard(props) {

    const { firstName, lastName, email, age, id, removeUser, userIndex, editUserCall, editUserValue } = props

    function btDeleteCall() {
        btDelete(id)
        removeUser(userIndex)
    }

    async function btDelete(memberships_id) {
        const url = 'http://localhost:9000/delete-user/' + memberships_id
        const deleted = await fetch(url, { method: 'DELETE' })
    }

    function btEditCall() {
        editUserCall()
        editUserValue(userIndex)
    }

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{age}</td>
            <td className="action__container">
                <button
                    className="action__container--btn"
                    onClick={btDeleteCall}>Delete</button>
                <button
                    className="action__container--btn"
                    onClick={btEditCall}>Edit</button>
            </td>
        </tr>
    )
}
