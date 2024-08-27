import React, { useEffect } from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
import { useGetMyUser, useUpdateMyUser } from '../../api/MyUserApi'
import { useCurrentUserConetxt } from '../../context/userContext'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfilePage = () => {

  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser()
  const { currentUser, isLoading: isUpdateLoading, refetch: refetchUserData } = useGetMyUser()

  const { isAuthenticated } = useAuth0()

  //conetxt forcurrent user
  const { setCurrentUserData, currentUserData } = useCurrentUserConetxt()

  useEffect(() => {
    if (currentUser) {
      setCurrentUserData(currentUser)
    } else {
      return
    }
  }, [currentUser, setCurrentUserData])


  // No Authentication
  // if (!isAuthenticated) {
  //   return (
  //     <div className="w-full h-full bg-white flex items-center justify-center ">
  //       <div className='md:w-[80%]  m-4'>
  //         <h1 className="text-xl md:text-2xl  text-amber-500 bg-amber-100 p-6 border text-center mt-20">Please Login To Access Benifits</h1>

  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className='pb-[60px] md:pb-[10px] p-5 mb-3 md:mb-[60px] lg:mb-0 '>
      <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} refetchUserData={refetchUserData} />
    </div>






  )
}

export default UserProfilePage
