import React from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
import UserDetailsShow from '../../components/UserDetailsShow'
import { useUpdateMyUser } from '../../api/MyUserApi'

const UserProfilePage = () => {

  const { updateUser, isLoading } = useUpdateMyUser()

  return (
    <div>

      <div className='z-10 over'>
        <UserProfileForm onSave={updateUser} isLoading={isLoading} />
      </div>


    </div>
  )
}

export default UserProfilePage
