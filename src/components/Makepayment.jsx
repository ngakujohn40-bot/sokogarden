import "bootstrap/dist/css/bootstrap.min.css"; //used for styling the UI
import { useState} from "react"; // for state management
import { useLocation } from "react-router-dom"; // 
import axios from "axios"; //used for API access


const Makepayment = () => {
    // extract the data received from the products using useLocation
    const {product} = useLocation().state || {};

    // hooks to hold phone Number
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("");


    // function to help submit the transaction details 
    const submit = async (e) => {
        e.preventDefault();

        // update the message for loading... 
        setMessage("Please wait as we process!");

        // store the updated hooks in a variable 
        const data = new FormData (); 
        data.append("phone", phone);
        data.append("amount", product.product_cost);

        // post the data to the API for th transaction to occur
        const response = await axios.post("https://otieno.alwaysdata.net/api/mpesa_payment", data);

        // setmessage to show the transaction status    
        setMessage("Please complete payment on your phone");

    }


    return  (
       <div className="container bg-info mt-5 p-4 shadow">
            <h1 className="text-success">LIPA NA MPESA</h1>
            <p className="text-primary">Product Name: {product.product_name}</p>
            <p className="text-danger">Product Cost: {product.product_cost}</p>

            {/* form */}
            <form onSubmit={submit}>
                {message}  

                {/* input fields  */}
                <input
                    type="text"
                    placeholder="Enter the phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <br /> <br />

                {/* button  */}
                <button
                    className="btn btn-danger"
                >Make Payment</button>
            </form>



       </div> 
    );
};

export default Makepayment;