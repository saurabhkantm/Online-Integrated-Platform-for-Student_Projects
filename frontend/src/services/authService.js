import axios from 'axios';
export const loginUser = async (email, password) => {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`,{
            email,
            password
    });
    localStorage.setItem('token',response.data.token);
    return response.data;
}

export const registerUser = async(name, email, password, role, organization) => {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/register`,{
        name,
        email,
        password,
        role,
        organization
    });
    localStorage.setItem('token',response.data.token);
    return response.data;
}

export const logoutUser = async()=>{
    localStorage.removeItem('token');
}

export const getCurrentUser = async()=>{
    const token = localStorage.getItem('token');
    if(!token){
        return null;
    }
    return token;
}