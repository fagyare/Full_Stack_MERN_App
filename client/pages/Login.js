import axios from 'axios'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const authResponse = await axios.post('/auth/login', form)
            localStorage.setItem("token", authResponse.data.token)

            const infoResponse = await axios.get(`/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            setUser(infoResponse.data)
            navigate('/profile')

        } catch(err) {
            alert(err.response.data.error)
            setForm(emptyForm)
        }
    }

    return ( 
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </>
     );
}

export default Login;