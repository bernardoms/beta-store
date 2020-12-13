import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { authUserFetch } from '../../store/fetchActions'

export default () => {

    const [form, setForm] = useState({username: '', password: '' })

    const formChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()
    
    const submitForm = (e) => {
        e.preventDefault()
        setForm({username: '', password: ''})

         dispatch(authUserFetch(form))
    }

    return (
        <form style= {{
            width: 350,
            margin: '40px auto'
        }} onSubmit={submitForm }>
            <h2 className='text-center'>Login User</h2>
            <div className='form-group'>
                <input type='text' placeholder='user' className='form-control' name='username' onChange={formChange} value={form.username}></input>
            </div>
            <div className='form-group'>
                <input type='password' placeholder='password' className='form-control' name='password' onChange={formChange} value={form.password}></input>
            </div>
            <div className='form-group'>
              <button className='btn btn-primary btn-block'>Login</button>
            </div>
        </form>
    )
}