export default function Home() {
  return (
    <div className="mx-5 my-3">
      {/* Hero Image */}
      <img src="/logo2.jpeg" alt="Hero Image" className="mx-auto object-cover w-full lg:max-w-[500px]" />
      <div className="flex flex-col items-center justify-center my-4 px-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-blue-900 lg:text-6xl">Yearling</h1>
        <h1 className="text-4xl font-extrabold text-blue-900 md:text-5xl lg:text-6xl mb-2">Performance Sale</h1>

        {/* Subtitle */}
        <p className="italic text-gray-600 mb-6">Follow the link below.</p>

        {/* Sale Catalog */}
        <a
          href="#"
          className="text-blue-900 font-bold underline hover:text-blue-700 text-lg"
        >
          View Sale Catalog
        </a>
        <p className="text-red-600 font-bold text-2xl mt-2">Wednesday</p>
        <p className="text-red-600 font-bold text-2xl mb-6">August 20th</p>

        {/* Contact Info */}
        <div className="text-lg text-gray-800 mb-6">
          <p className="font-semibold">Jimmy Lathero</p>
          <p>(772) 321-3784</p>
          <p>Fellsmere, Florida</p>
        </div>

        {/* Divider */}
        <hr className="w-full max-w-sm border-gray-300 mb-6" />

        {/* Past Sale Results */}
        <a
          href="#"
          className="text-blue-900 font-bold underline hover:text-blue-700 text-lg"
        >
          View Past Sale Results
        </a>

        {/* Divider */}
        <hr className="w-full max-w-sm border-gray-300 mt-6" />
      </div>
      <div className="">
        <img
          src="/bull.jpeg"
          alt="Hero Image"
          className="mx-auto object-cover w-full lg:max-w-[500px]"
        />
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-10 text-center space-y-6">
      {/* Contact Info */}
      <div>
        <p className="font-bold text-lg">Contact Nate Morrison</p>
        <p className="font-semibold">(605) 515-4313</p>
        <p className="mt-1">for information on</p>
        <p className="font-semibold">how to consign livestock.</p>
      </div>

      {/* Divider */}
      <hr className="w-full max-w-lg border-gray-400" />

      {/* Sellers Section */}
      <h2 className="font-bold italic text-xl mt-4">
        SELLERS ONLY: PAY FOR YOUR ADVERTISEMENT <br /> AND SERVICES ONLINE
      </h2>

      {/* Payment Image Placeholder */}
      <div className="w-52 h-16 flex items-center justify-center border border-gray-300 rounded-md">
        {/* Replace with your own PayPal image */}
        <img
          src="/paypal2.jpg"
          alt="Payment Options"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Sellers Text */}
      <div className="max-w-2xl text-sm md:text-base text-gray-800 leading-relaxed">
        <p>
          <span className="font-bold">Sellers:</span> You can pay your advertisements and
          services fees online using PayPal. If you do not have a PayPal account,
          you can pay by credit or debit card.
        </p>
        <a
          href="#"
          className="block mt-3 font-bold text-blue-900 underline hover:text-blue-700 text-lg"
        >
          CLICK HERE TO PAY ONLINE
        </a>
      </div>

      {/* Buyers Text */}
      <div className="max-w-2xl text-sm md:text-base text-black leading-relaxed">
        <p className="">
          <span className="font-bold">Buyers:</span> All money transactions must be made
          between you and the seller directly. It is your responsibility to
          contact the consignor to make payment directly to them.
        </p>
        <p className="mt-3 font-bold text-black">
          The Breeders Connection is not involved in the actual transaction <br />
          between buyers and sellers.
        </p>
      </div>
    </div>

    </div>
  );
}
