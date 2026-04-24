import "bootstrap/dist/css/bootstrap.min.css"; //for styling the UI
import {Link, useNavigate} from "react-router-dom"; //used for routing / navigation
import axios from "axios"; // used for API access
import { useState } from "react"; //used to manage state


const Signin = () => { 
    //define the hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // hooks used to help indicate state of our sign up process
    const [loading, setLoading] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    //hook for navigation
    const navigate = useNavigate()

    //function to help submit the data
    const submit = async (e) => {
        e.preventDefault() //prevents default form submission

        setLoading("Please wait as we log you in...");

        try {
            // add the data in the hooks in variable
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);

            //post the data to the API
            const response = await axios.post("https://john45.alwaysdata.net/api/signin", data)

            //update the state to be loading
            setLoading("");

            // check if the response has the user
            if(response.data.user) {
                // take to the home page
                setSuccess("Login successful");
                setSuccess(data.user);
                navigate("/")
            } else {
                //user not found
                setError("Login Failed")
            }
        
        } catch (error) {
            setLoading("");
            setError("There was a server error");
        }
    };



    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4 bg-secondary">

                <h2 className="text-dark">Sign In</h2>

                {/* form  */}
                <form onSubmit={submit}>
                    {/* bind */}
                    {loading && <div className="alert alert-info">{loading}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}


                    <input 
                    type="email"
                    placeholder="Enter  email..."
                    className="form-control"   
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}             
                    required />

                    <br />

                    <input
                    type="password"
                    placeholder="Enter password..."
                    className="form-control"    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}               
                    required />

                    <br />
                    
                    <button type="submit" className="btn btn-outline-warning w-100">
                        Log In
                    </button>
                </form>
                <br />
                    Don't have an account<Link to="/signup" className=" btn btn-danger">Sign up</Link>

            </div>

        </div>
    );
};

export default Signin;