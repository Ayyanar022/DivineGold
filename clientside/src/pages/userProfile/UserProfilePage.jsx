import React from 'react'
import UserProfileForm from '../../components/forms/UserProfileForm'
import UserDetailsShow from '../../components/UserDetailsShow.jsx'

const UserProfilePage = () => {
  return (
    <div>
      <div>
        <h1>User Profile page welcome</h1>
        <div>
          <UserProfileForm />
        </div>
        <div>
          <UserDetailsShow />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
