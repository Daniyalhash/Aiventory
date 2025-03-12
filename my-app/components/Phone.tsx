// import Image from "next/image";

// const Phone = () => {
//   return (
//     <div className="flex items-center justify-center py-10 bg-white">
//       <div className="flex flex-col md:flex-row items-center gap-10">
//         {/* Left Section */}
//         <div className="text-left max-w-md">
//           <h2 className="text-3xl font-bold">
//             <span className="text-green-500">Customer</span> Barcode Scanning
//           </h2>
//           <p className="mt-4 text-gray-600">
//             Scan products to get real-time product details and alternatives.
//           </p>
//           <button className="mt-6 px-5 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2">
//             Download now
//             <span className="flex gap-1">
//               <Image src="/apple-icon.svg" alt="Apple Store" width={20} height={20} />
//               <Image src="/playstore-icon.svg" alt="Google Play" width={20} height={20} />
//             </span>
//           </button>
//         </div>

//         {/* Right Section */}
//         <div className="relative">
//           <Image
//             src="/images/phone.png" // Replace this with the correct path to your prototype image
//             alt="iPhone Prototype"
//             width={250}
//             height={500}
//             className="rounded-3xl shadow-lg"
//           />
          
//           {/* Floating Buttons */}
//           <div className="absolute top-16 right-0 bg-white px-4 py-1 rounded-lg shadow-md border">
//             <span className="text-gray-600">Get Product </span>
//             <span className="text-green-500 font-bold">Alternatives</span>
//           </div>
//           <div className="absolute bottom-16 left-0 bg-white px-4 py-1 rounded-lg shadow-md border">
//             <span className="text-gray-600">Get Product </span>
//             <span className="text-green-500 font-bold">Details</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Phone;
import Image from "next/image";
import '@/styles/Phone.css'; // Import the new CSS file

const Phone = () => {
  return (
    <div className="phone-container">
      <div className="phone-content">
        {/* Left Section */}
        <div className="left-section">
          <h2 className="title">
            <span className="customer">Customer</span> Barcode Scanning
          </h2>
          <p className="description">
            Scan products to get real-time product details and alternatives.
          </p>
          <div className="buttonContainer">
          <button className="download-button">
          Download now

          </button>
          <button className="download-button-icon">
          <Image src="/images/apple.png" alt="Apple Store" width={20} height={20} />

          </button>
          <button className="download-button-icon">
          <Image src="/images/playstore.png" alt="Google Play" width={20} height={20} />

          </button>
          </div>
     
        </div>

        {/* Right Section */}
        <div className="right-section">
          <Image
            src="/images/phone.png" // Make sure to adjust the path if necessary
            alt="iPhone Prototype"
            width={250}
            height={500}
            className="phone-image"
          />
          
          {/* Floating Buttons */}
          <div className="floating-button alternatives">
            <span className="text-gray">Get Product </span>
            <span className="text-green">Alternatives</span>
          </div>
          <div className="floating-button details">
            <span className="text-gray">Get Product </span>
            <span className="text-green">Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;