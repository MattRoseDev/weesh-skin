import React from 'react'
import { editProfileReducer } from 'Root/reducers/editProfile'

export const EditProfileContext = React.createContext()

const initialEditProfile = {}

const EditProfileProvider = (props) => {
    const [editProfile, dispatch] = React.useReducer(editProfileReducer, initialEditProfile)
    
    return <EditProfileContext.Provider value={{ editProfile, dispatch }}>
        {props.children}
    </EditProfileContext.Provider>
}

export default EditProfileProvider