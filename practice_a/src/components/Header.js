import { ToastContainer,toast } from "react-toastify";

 export default function Header(){
    const open = () => {
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };
    return(
        <ToastContainer />
    )
 }