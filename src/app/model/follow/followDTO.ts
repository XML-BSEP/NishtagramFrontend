import { UserDTO } from './userDTO';
export class FollowDTO{
  follower: UserDTO
  user : UserDTO
  constructor(follower : UserDTO, user: UserDTO){
    this.follower = follower
    this.user = user
  }
}
