import "bootstrap/dist/css/bootstrap.min.css"; // used for UI styling
import axios from "axios"; //used for API access
import {useState, useEffect} from "react"; //used for state management
import {useNavigate, Link} from "react-router-dom"; //used for navigation


const Getproducts = () => {
    // initialize the hooks
    const [products, setProducts] = useState([]) //by default it's an empty array
    const [loading, setLoading] = useState("") //used for updating the loading message
    const [error, setError] = useState("") //for error message

    // hook for navigation
    const navigation = useNavigate()

    // variable to specify where the images are located in the database
    const img_url = "https://john45.alwaysdata.net/static/images/"


    // function to help in retrieval of  data
    const getproducts = async () => {

        setLoading("Please wait, we are retrieving the products .. ");

        try {
            const response = await axios.get("https://john45.alwaysdata.net/api/get_products_details")

            setProducts(response.data)
            setLoading("")

        } catch(error) {
            setLoading(" ")
            setError("There was an error")
        }
    }

    // function to call the getproducts() function
    useEffect(() => {
        getproducts()
    }, []); // useEffect hook makes the getproducts() function to run only once which only runs when the component has been fully loaded/ has finished loaded.


    return (
        <div className="row">     
                   
           <h3 className="mt-5 text-primary bg-dark"><b>Available Products</b></h3>

           <br />

           {/* binding the success and the error messages */}

            {loading && <div className="alert alert-info">{loading}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            

            {products.map( (product) =>  (
                <div className="col-md-3 justify-content-center mb-3 bg-secondary" key={product.id}>
                {/* card to display the product on the page */}
                    <div className="card shadow card-margin bg-success">
                        <img
                            src={img_url + product.product_photo}
                            alt={product.product_name}
                            className="product_img mt-4"
                            height="250px"
                            width="295px"
                        />
                        <div className="card-body">
                            <h5 className="mt-2" style={{color: 'darkred'}}>{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <p className="text-warning">Ksh{product.product_cost}</p>

                            <br />

                            <button 
                                className="btn btn-dark mt-2 w-100"
                                onClick={() => navigation("/makepayment", {state: {product}})}
                            >Purchase Now</button>
                            
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Getproducts;