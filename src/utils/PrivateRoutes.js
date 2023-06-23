import { Outlet, Navigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const PrivateRoutes = () => {
    const Firebase = useFirebase();


    let auth = Firebase.isLoggedin;
    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}



export default PrivateRoutes;

