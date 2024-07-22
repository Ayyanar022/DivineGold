import React, { useEffect } from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
// import UserDetailsShow from '../../components/UserDetailsShow'
import { useGetMyUser, useUpdateMyUser } from '../../api/MyUserApi'
import { useCurrentUserConetxt } from '../../context/userContext'

const UserProfilePage = () => {

  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser()
  const { currentUser, isLoading: isUpdateLoading } = useGetMyUser()

  //conetxt forcurrent user
  const { setCurrentUserData } = useCurrentUserConetxt()
  // console.log("---cur", currentUser)

  useEffect(() => {
    setCurrentUserData(currentUser)
  }, [currentUser])

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
