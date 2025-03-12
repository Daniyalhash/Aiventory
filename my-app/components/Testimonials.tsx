import Image from "next/image";
import '@/styles/Testimonials.css'; // Import the new CSS file

const Testimonials = () => {
  return (
    <div className="Testimonials-section">
        <div className="Testimonials-container">
            <div className="Testimonials-heading-main">
                <h2 className="Testimonials-heading">
                    <span className="Testimonials-highlight">Discover</span> firsthand the
                    <span className="Testimonials-highlight"> transformative</span> impact of
                    <span className="Testimonials-bold"> A</span>inventory
                </h2>
            </div>
           

            <div className="testimonials">
                <div className="testimonial">
                    <Image
                        src="/images/men.jpg"
                        alt="User 1"
                        width={250}
                        height={250}
                        className="testimonial-image"
                    />
                    <p className="testimonial-text">
                        This system has transformed the way I manage my inventory! The
                        demand forecasting feature has saved me from stock shortages
                        multiple times. Auto-replenishment is a lifesaver.
                    </p>
                </div>

                <div className="testimonial">
                    <Image
                        src="/images/men2.jpg"
                        alt="User 2"
                        width={250}
                        height={250}
                        className="testimonial-image"
                    />
                    <p className="testimonialtext">
                    The ease of use and accuracy of stock predictions have made my job
                        much easier. Auto-ordering with vendors works seamlessly. A
                        must-have tool for any inventory-heavy business!
                    </p>
                </div>

                <div className="testimonial">
                <Image
                    src="/images/men3.jpg"
                    alt="User 3"
                    width={250}
                    height={250}
                    className="testimonial-image"
                />
                <p className="testimonial-text">
                I love how the AI-powered features like barcode scanning and expiry
                    alerts ensure my store stays stocked with fresh products. No more
                    worrying about expired items!
                </p>
                </div>
            </div>

            <div className="star">
                <Image src="/images/star2.png" alt="Star" width={800} height={800} />
            </div>
        </div>
    </div>
  
  );
};

export default Testimonials;