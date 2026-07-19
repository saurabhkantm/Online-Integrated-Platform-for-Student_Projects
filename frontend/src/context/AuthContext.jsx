import React, { useEffect, useState } from 'react'
import {register,login,logout,getCurrentUser} from '../services/authService'

const AuthContext = ({children}) => {
    const [user,setUser] = useState(null);
    const [role,setRole] = useState(null);
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        const restoresession = async()=>{
            try{
                const currentuser = await getCurrentUser();
                if(currentuser){
                    setUser(currentuser);
                    setRole(currentuser.role);
                }
            }catch(err){
                setUser(null);
                setRole(null);
            }finally{
                setLoading(false);
            }
        };
        restoresession();
    },[]);
    const register = async(userData)=>{
        const newUser = await register(userData);
        return newUser;
    }
    const login = async(credentials,expectedRole)=>{
        const loginUser = await login(credentials,expectedRole);
        setUser(loginUser.user);
        setRole(loginUser.user.role);
        return loginUser;
    }
    const logout = async()=>{
        await logout();
        setUser(null);
        setRole(null);
    }
    return (
    <AuthContext.Provider value={{role,user,loading,register,login,logout,getCurrentUser}}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;