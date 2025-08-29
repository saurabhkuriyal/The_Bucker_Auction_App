// app/about/page.js  (if you are using App Router in Next.js 13+)

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          About Us
        </h1>

        <p className="text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold">The Bucker Auction</span>, a trusted 
          online platform designed to connect sellers and buyers of bulls through 
          live auctions. We aim to provide a transparent, fair, and efficient 
          marketplace where sellers can showcase their bulls and buyers can 
          participate in competitive bidding.
        </p>

        <p className="text-gray-600 leading-relaxed">
          As a platform, we do not take part in the transactions between sellers 
          and buyers. Our role is to provide a secure and user-friendly 
          environment where auctions can take place seamlessly. Sellers can list 
          their bulls for auction, while buyers can browse and bid with ease.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Our revenue model is simple: we charge sellers a listing fee to put 
          their bulls on auction. This helps us maintain the platform, improve 
          features, and ensure smooth operations for both sellers and buyers.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Whether you’re a farmer, breeder, or buyer looking for the right bull, 
          BullAuction is here to simplify the process and connect you with the 
          right opportunities.
        </p>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Join us today and be part of the future of bull trading.
          </h2>
        </div>
      </div>
    </div>
  );
}
