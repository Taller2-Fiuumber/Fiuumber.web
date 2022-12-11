import { Admin } from '../../models/admin'
import { UserToken } from '../../models/userToken'



export var currentAdmin = new Admin( 42, '', '', '', '');

export const currentUserToken = new UserToken(currentAdmin, '');

