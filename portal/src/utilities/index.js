import { jwtDecode } from 'jwt-decode';

export const getLogedId = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  //   console.log(decoded);
  return decoded.id;
};

// // export const getLogedRole = () => {
// //   const token = localStorage.getItem('token');
// //   const decoded = jwtDecode(token);
// //   return decoded.role;
// // };

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const isRoleCheck = role => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    return (decoded.role = role);
  } catch (e) {
    return false;
  }
};
