import React from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
// import UserDetailsShow from '../../components/UserDetailsShow'
import { useGetMyUser, useUpdateMyUser } from '../../api/MyUserApi'

const UserProfilePage = () => {

  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser()
  const { currentUser, isLoading: isUpdateLoading } = useGetMyUser()


  if (isGetLoading) {
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Unable to load user Profile..</span>
  }

  return (

    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />




  )
}

export default UserProfilePage
