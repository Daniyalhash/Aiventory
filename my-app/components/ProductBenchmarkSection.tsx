import "@/styles/ProductBenchmarkSection.css";
import { useState, useEffect } from "react";
import ComparisonChart from "./ComparisonChart";
import axios from 'axios';
import { fetchCategories,fetchProductsByCategory } from "@/utils/api";
import ProfitMarginChart from "@/components/ProfitMarginChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';


export default function ProductBenchmarkSection() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    // const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [product, setProduct] = useState([]);
    const [searchResults, setSearchResults] = useState([]); // For storing product search results
    const [UseCategory, setUseCategory] = useState("");
    const [chartData2, setChartData2] = useState<Array<{ name: string; value: number }>>([]);
    const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);
    const [targetProductDetails, setTargetProductDetails] = useState(null);
    const [applyClicked, setApplyClicked] = useState(false);
    const [isProductSelected, setIsProductSelected] = useState(false);
    const [error, setError] = useState(null);

    const [range, setRange] = useState('1-5'); // Default range
    const [range2, setRange2] = useState('1-5'); // Default range
    const [allProducts, setAllProducts] = useState([]); // For storing all products
    const [searchText2, setSearchText2] = useState(''); // For tracking the search text

    const [searchText, setSearchText] = useState('');

    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    

    // fetching just categories using SWR
        
    const { data: categoryData, error: swrError } = useSWR(
        userId ? ["get-categories", userId] : null,
        () => fetchCategories(userId),
        { revalidateOnFocus: false, shouldRetryOnError: false }
    );

    useEffect(() => {
        if (categoryData) {
            setCategories(categoryData.categories || []);
        }
    }, [categoryData]);


   
   

    // fetching product based on categories on;ly top 5
    const fetchProductsByCategory = async (category) => {
        setLoading(true); // Set loading to true before fetching products
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User ID is missing');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/aiventory/get-top-products-by-category/', {
                params: { user_id: userId, category: category },
            });

            if (response.status === 200) {
                setAllProducts(response.data.products);
                
                setProducts(response.data.products.slice(0, 10));
            } else {
                setError(response.data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

   

    // Apply selected product to comparison
    const handleApplyProduct = () => {
        if (!selectedCategory) {
            setError("Please select a category.");
            setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
            return;
        }
        if (!isProductSelected) {
            setError("Please select a product to compare.");
            setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
            return;
        }
        setApplyClicked(true);

        if (!selectedProduct) {
            setError("Please select a product first.");
            return;
        }
        

        fetchComparisonData(selectedProduct, selectedCategory);

    };

    // Fetch products for comparison
    const fetchComparisonData = async (product, category) => {
        setLoading(true);

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User ID is missing');
            setLoading(false);
            return;
        }

        try {
           
            const vendor_id = product.vendor_id
            // Get all products in the same category, including the selected product
            const response = await axios.get('http://127.0.0.1:8000/aiventory/get-products-by-name/', {
                params: { user_id: userId, category: category, vendor_id: vendor_id },
            });

            if (response.status === 200) {

                const products = response.data.products;
                const targetProduct = products.find((p) => p.productname === product.productname);

                if (targetProduct) {
                    // Ensure the target product is always included and appears first
                    setTargetProductDetails(targetProduct); // Save target product details
                    const comparisonData = [targetProduct, ...products.filter((prod) => prod.productname !== product.productname)].map((prod) => ({
                        name: prod.productname,
                        value: prod.sellingprice,
                    }));
                    // Ensure the target product is always included and appears first
                    const comparisonData2 = [targetProduct, ...products.filter((prod) => prod.productname !== product.productname)].map((prod) => ({
                        name: prod.productname,
                        value: prod.profitmargin,
                    }));

                    setChartData(comparisonData);
                    setChartData2(comparisonData2)
                    setRange(getRangeBasedOnSize(products.length)); // Dynamically set range
                }
            } else {
                setError(response.data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error("API call failed:", error);
            setError('Error fetching comparison data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // Set range based on the number of products
    const getRangeBasedOnSize = (numProducts) => {
        if (numProducts > 50) {
            return '1-60';
        } else if (numProducts > 20) {
            return '1-20';
        } else {
            return '1-5';
        }
    };
    // use for changing range
    const handleRangeChange = (event) => {
        setRange(event.target.value);
    };
    const handleRangeChange2 = (event) => {
        setRange2(event.target.value);
    };

    // Corrected generateRangeOptions function
    const generateRangeOptions = (dataLength) => {
        const options = [];
        if (dataLength === 0) return options; // Handle empty data case

        for (let i = 5; i <= dataLength; i += 5) {
            options.push(`1-${Math.min(i, dataLength)}`); // Ensure max doesn't exceed dataLength
        }
        if (!options.includes(`1-${dataLength}`) && dataLength > 0) {
            options.push(`1-${dataLength}`)
        }
        return options;
    };
    // Filter chart data based on selected range (Common function)
    const filterChartData = (data, selectedRange) => {
        if (!data || data.length === 0) return []; // Handle null or empty data
        if (!selectedRange) return data
        const [min, max] = selectedRange.split('-').map(Number);
        return data.slice(min - 1, max);
    };
    const filteredChartData = filterChartData(chartData, range);
    const filteredChartData2 = filterChartData(chartData2, range2);

    // Handle category change
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSearchText(""); 
        // Clear search text when a category is selected
        setUseCategory(category)
        if (category) {
            fetchProductsByCategory(category);
        } else {
            setProducts([]); // Clear products if no category is selected
        }
    };
    // Handle product selection
    const handleProductSelect = (product) => {
        setSearchText(product.productname); // Update search text
        setSelectedProduct(product); 
        setIsProductSelected(true);
        // Store the selected product
    };

    const updateRangeData = (range, data, setFilteredData) => {
        const [min, max] = range.split('-').map(Number);
        const filtered = data.filter((_, index) => index >= min - 1 && index <= max - 1);
        setFilteredData(filtered);
    };

// Handle change in the search input field
const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    // Filter the products based on search text
    const filteredProducts = allProducts.filter(product =>
        product.productname.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Update the products to display only the filtered ones
    setProducts(filteredProducts.slice(0, 5)); // You can adjust the logic to show top 5 or all
};
    // edir

    useEffect(() => {
        setChartData(products); // Show all products initially
    }, [products]);

    const rangeOptions = generateRangeOptions(chartData.length);
    const rangeOptions2 = generateRangeOptions(chartData2.length);

    return (
        <section className="ProductBenchmarkSection">
            <div className="ProductLeftSection">
                {/* Conditionally render the image or the visual boxes */}
                {!applyClicked ? (
                    <div className="imagePlaceholder">
            <img src="/images/star.png" alt="Placeholder" className="moving-image" />
            <p className="moving-text">Select product to start product beanchamrking</p>
            </div>
                ) : (
                    <>
                        <div className="visual-box big">
                            <div className="bigDetails">
                                <h3>Selling Price Comparison</h3>

                                <div className="bigheader-actions">
                                    <select className="bigrange-dropdown" value={range} onChange={handleRangeChange}>
                                        {rangeOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                Products {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="chartsDetails">
                                {filteredChartData.length > 0 ? ( // Use filtered data here
                                    <ComparisonChart data={filteredChartData} />
                                ) : (
                                    <p>No data available for comparison.</p>
                                )}
                            </div>

                        </div>
                        <div className="visual-box medium">
                            <div className="mediumHead">
                                <h3>Profit Margin Comparison</h3>
                                <div className="header-actions">
                                    <select className="range-dropdown" value={range2} onChange={handleRangeChange2}>
                                        {rangeOptions2.map((option, index) => (
                                            <option key={index} value={option}>
                                                Products {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="charts">
                                {filteredChartData2.length > 0 ? ( // Use filtered data here
                                    <ProfitMarginChart data={filteredChartData2} targetProduct={selectedProduct} />
                                ) : (
                                    <p>No data available for comparison.</p>
                                )}
                            </div>
                        </div>



           
                <div className="ProductLeftSectionSub">

                    <div className="visual-box small">
                        <h3 className="SmallHead">Average Stock</h3>
                        {targetProductDetails ? (
                            <div className="stock-details">
                                <p><strong className="strong1">{targetProductDetails.stockquantity || "N/A"} </strong> Average Stocks units</p>
                                <p><strong className="strong1"> {targetProductDetails.reorderthreshold || "N/A"}</strong> units Threshold Level</p> {/* Example reorder threshold */}

                            </div>
                        ) : (
                            <p>No target product selected yet.</p>
                        )}
                    </div>
                    <div className="visual-box smallsub">
                        <h1 className="SmallHead2">Vendor</h1>
                        {targetProductDetails ? (
                            <div className="vendor-details">
                                    <p className="vendor-name-0">Vendor Name :</p>

                                <p className="vendor-name">{targetProductDetails.vendor || "N/A"}</p>
                                <div className="score-and-time">
                                    <span className="strong2">{targetProductDetails.ReliabilityScore || "N/A"}</span>
                                    <span className="score-label">/100 RB Score</span>
                                    <span className="strong2">{targetProductDetails.DeliveryTime || "N/A"}</span>
                                    <span className="score-label">/days Delivery Time</span>
                                </div>
                            </div>
                        ) : (
                            <p>No target product selected yet.</p>
                        )}
                    </div>
                </div>


                </>
                )}
            </div>
            <div className="ProductRightSection">
                <div className="ProductRightSubPart1">
                    {/* Toggle buttons */}
                    <button
                    >
                        Single Product Benchmark
                    </button>
                 
                </div>
                <div className="ProductRightSubPart2">
                    {/* Conditional content based on comparisonMode */}

                    <div className="comparison-parameters">
                        <h3>Single Product Comparison</h3>
                        <div>
                            
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* product search */}
                        <input
                            type="text"
                            id="product-search"

                            placeholder="Search Product Name"
                            value={searchText}
                            onChange={handleSearchChange} // Call handleSearchChange on input change


                        // Update search text state
                        />                            {/* Show loading animation when fetching products */}
                        {loading && (
                            <div className="loadingAnimation">
                                <div className="gemini-shine"></div> {/* Add your custom gemini loading animation */}
                            </div>
                        )}

                        {/* Product suggestions */}
                        <div className="productSuggestions">
                            <p className="productSuggestionsText">Suggestions</p>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="suggestionAnswer"
                                        onClick={() => handleProductSelect(product)} // Select product
                                    >
                                        <p>{product.productname}</p>
                                        <FontAwesomeIcon icon={faPlus} className="suggestedIcon" />
                                    </div>
                                ))
                            ) : (
                                !loading && <p>please select a product</p> // If no products found
                            )}
                        </div>
                        {/* Display search results */}
   
                        {error && <p className="error-msg">{error}</p>} {/* Error message here */}

                        <button onClick={handleApplyProduct}>Apply</button>

                    </div>

                </div>
            </div>
        </section>
    );
}
