import "bootstrap/dist/css/bootstrap.min.css";// used for styling the UI
import { useState } from "react";//used for state management
import axios from "axios";//used for API access



const Addproduct = () => {
    // declare the hooks 
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");
    const [date_created, setDateCreated] = useState("");

    // hooks to show the information messages
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // function to help submit the data 
    const submit = async (e) => {
        e.preventDefault() //prevent the default JavaScript actions

        // update the loading 
        setLoading("Please wait ..");

        // data variable/object to store the data entered by the user
        const data = new FormData();
        data.append("product_name", product_name);
        data.append("product_description", product_description);
        data.append("product_cost", product_cost);
        data.append("product_photo", product_photo);


        //post the data to the API
        try {
            const response = await axios.post("http://john45.alwaysdata.net/api/add_product", data);

            setLoading("");

            // update the message hook to successfullyy added to show the user 
            setSuccess("Product uploaded successfully.")

            // clear the form input fields 
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
        } catch(error) {
            setError("Failed to add product. Please try again.")
        }
    };




    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4 bg-dark">


                {/* form  */}

                <form onSubmit={submit}>
                    {/* product_name, product_description, product_cost, product_photo */}
                    {/* bind the status messages */}
                    <h5>{loading}</h5>
                    <h5>{success}</h5>
                    <h5>{error}</h5>
                    
                    <h3 className="text-primary">Upload Products</h3>
                    <input type="text"
                        placeholder="Enter product name..."
                        className="form-control"
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />

                    <br />

                    <textarea
                        className="form-control"
                        placeholder="Describe your product..."
                        value={product_description}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    ></textarea>

                    <br />

                    <input
                        type="number"
                        placeholder="Enter product cost"
                        className="form-control"
                        value={product_cost}
                        onChange={(e) => setProductCost(e.target.value)}
                        required
                    />

                    <br />

                    <b>Browse/Upload Product Image</b>
                    <br />

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                    />

                    <br />
                    

                    {/* submit button  */}
                    <button    
                        type="submit" 
                        className=" btn btn-outline-warning"
                    >Upload Product</button>
                        
                    

                </form>
            </div>
        </div>
    );
};

export default Addproduct;