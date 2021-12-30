import api from './api'
import User from '../dtos/User'

const ProfileService = {
  update(user: User) {
    return api.put('/auth/v1/user', user)
  }
}

export default ProfileService
