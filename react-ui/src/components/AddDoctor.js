import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addDoctorThunk } from '../redux/doctors'


export function AddDoctor(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [doctorType, setDoctorType] = useState('')

    const handleSubmit = (event) => {
        console.log('submitted')
        event.preventDefault()
        console.log("WHAT ARE PROPS", props)
        const userId = props.currentUser.id
        const payload = { firstName, lastName, address, doctorType, userId }
        console.log(payload)
        props.addNewDoctor(payload)
    }


    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Add a New Doctor</h1>
                <div>
                    <input
                        type="text"
                        required
                        placeholder="first name or title"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
                        placeholder="office address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
                        placeholder="specialty"
                        value={doctorType}
                        onChange={(e) => setDoctorType(e.target.value)}
                    />
                </div>
                <br />
                <button type='submit'>Add Doctor</button>
            </form>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDoctor)