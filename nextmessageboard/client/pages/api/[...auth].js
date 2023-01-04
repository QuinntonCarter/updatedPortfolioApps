import User from '../../models/User';
import { userAPI } from '../../lib/api';
import dbConnect from '../../lib/dbConnect';
// ** set token from cookie here **
// userAPI.interceptors.request.use((config) => {

// })

// all requests to API must be passed through here **
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        // const response =
        // SIGN UP REQUEST
      } catch (error) {
        // ERROR HANDLE
      }
      break;
    case 'PUT':
      try {
        // const response =
        // LOGIN REQUEST
      } catch (error) {
        // ERROR HANDLE
      }
      break;
    default:
      break;
  }
}
