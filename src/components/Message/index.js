import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {removeMessage} from '../../store/ducks/layout'

export default function Message({message}) {
    
    const dispatch = useDispatch();
     useEffect(() => {
        setTimeout(()=>{
            dispatch(removeMessage(message))
        }, 2500)
    }, [dispatch, message])

    return (
    <React.Fragment>
        <div className="container mt-3">
            <div className="alert alert-info" role="alert">
               {message}
            </div>
        </div>
    </React.Fragment>);
}