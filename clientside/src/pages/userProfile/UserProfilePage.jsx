import React, { useEffect } from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
import { useGetMyUser, useUpdateMyUser } from '../../api/MyUserApi'
import { useCurrentUserConetxt } from '../../context/userContext'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfilePage = () => {

  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser()
  const { currentUser, isLoading: isUpdateLoading, refetch: refetchUserData } = useGetMyUser()


  //conetxt forcurrent user
  const { setCurrentUserData, currentUserData } = useCurrentUserConetxt()

  useEffect(() => {
    if (currentUser) {
      setCurrentUserData(currentUser)
    } else {
      return
    }
  }, [currentUser, setCurrentUserData, currentUserData])


  return (
    <div className='pb-[60px] md:pb-[10px] p-1 md:p-5 mb-3 md:mb-[60px] lg:mb-0 '>
      <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} refetchUserData={refetchUserData} />
    </div>
  )
}

export default UserProfilePage
