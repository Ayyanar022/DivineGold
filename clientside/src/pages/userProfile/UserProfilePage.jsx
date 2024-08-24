import React, { useEffect } from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
import { useGetMyUser, useUpdateMyUser } from '../../api/MyUserApi'
import { useCurrentUserConetxt } from '../../context/userContext'

const UserProfilePage = () => {

  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser()
  const { currentUser, isLoading: isUpdateLoading } = useGetMyUser()

  //conetxt forcurrent user
  const { setCurrentUserData, currentUserData } = useCurrentUserConetxt()

  useEffect(() => {
    setCurrentUserData(currentUser)
  }, [currentUser, setCurrentUserData, currentUserData])

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Loading... User Profile..</span>
  }

  return (
    <div className='pb-[60px] md:pb-[10px] p-5 mb-3 md:mb-[60px] lg:mb-0 '>
      <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    </div>






  )
}

export default UserProfilePage
