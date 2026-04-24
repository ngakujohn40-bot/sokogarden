import "bootstrap/dist/css/bootstrap.min.css"; //for styling the UI
import {Link} from "react-router-dom"; //used for routing
import axios from "axios"; // used for API access
import { useState } from "react"; //used for state management



const Signup = () => {

    // Initialize the hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // hooks used
    //  to help indicate state of our sign up process
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // function to help submit the form
    const submit = async (e) => {
        e.preventDefault() //prevents the default javascript actions

        setLoading("Please wait as we try to upload  data..")
        
        try {
            // add the data in the hooks in variable
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("password", password);
            data.append("phone", phone);

            //post the data to the API
            const response = await axios.post("https://john45.alwaysdata.net/api/signup", data);
            
            //update the state to be loading
            setLoading("");

            //set the success hook to show a message
            // setSuccess("Data upload was successful")
            setSuccess(response.data.message);

            //clear the form input fields after data submission
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");
        } catch (error) {
            setLoading("");
            setError(error.message);
            
        }
        
    };


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4 bg-success">
                <h2 className="text-dark">Sign Up</h2>

                {/* form  */}
                <form onSubmit={submit}>
                    {loading && <div className="alert alert-info">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}


                    <input
                     type="text"
                     className="form-control"
                     placeholder="Enter username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required />
                     <br />
                    <input 
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                    <br />
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    <br />
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number.."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required />
                    <br />
                    <button type="submit" className="btn btn-outline-danger">
                        Create Account
                    </button>

                </form>
                <br />  

                Already have an account ?<Link to="/signin" className=" btn btn-warning">Sign In</Link>
            </div>
        </div>
    );
};

export default Signup;