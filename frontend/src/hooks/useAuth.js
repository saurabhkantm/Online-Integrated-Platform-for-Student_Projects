import React from 'react'
import { useContext } from 'react';
import Authcontext from '../context/AuthProvider';

const useAuth = () => {
    const context = useContext(Authcontext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default useAuth