
export default function page() {

  const lots = [
    {
      id: 1,
      title: "Yearling Bucking Bull - Ace 49M",
      pedigree: "828F Steel Poppin X A712 Pit Boss",
      biddingEnds: "8:00 PM CST",
    },
    {
      id: 2,
      title: "Yearling Bucking Bull - McGuire/Wiker M52",
      pedigree: "d-18 Coal Train X Not Available",
      biddingEnds: "9:05 PM CST",
    },
    {
      id: 3,
      title: "Yearling Bucking Bull - McGuire M081",
      pedigree: "14J Walk Hard X 05A Stone's Edge",
      biddingEnds: "8:10 PM CST",
    },
    {
      id: 4,
      title: "Yearling Bucking Bull - McGuire M082",
      pedigree: "14J Walk Hard X 05A Stone's Edge",
      biddingEnds: "8:15 PM CST",
    },
    {
      id: 5,
      title: "Yearling Bucking Bull - McGuire M083",
      pedigree: "14J Walk Hard X 05A Stone's Edge",
      biddingEnds: "8:20 PM CST",
    },
    {
      id: 6,
      title: "Can add more dyanmically",
      pedigree: "Can be added through a admin panel",
      biddingEnds: "8:25 PM CST",
    },



    // Add more lots...
  ];

  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-4xl text-center space-y-6">

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Ace of Spades & McGuire Cattle Co. Bull Sale <br />
              Thursday - July 31, 2025
            </h1>

            {/* Times */}
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">
                START TIME: <span className="font-bold">THURSDAY, JULY 31ST AT 8:00 AM CST</span>
              </p>
              <p className="text-gray-700 font-medium">
                CLOSE TIME: <span className="font-bold">THURSDAY, JULY 31ST AT 8:00 PM CST</span>
              </p>
              <p className="text-red-600 font-bold uppercase">
                Lots end in 5 minute intervals
              </p>
            </div>

            {/* Sale Notes */}
            <div className="text-left space-y-3 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 text-center">
                Sale Notes:
              </h2>
              <div className="mx-auto">
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>
                    Lots <span className="text-red-600 font-semibold">MUST</span> be paid for within 7 days of the sale date.
                    (By: <span className="font-semibold">8/7/2025</span>)
                  </li>
                  <li>
                    Lots <span className="text-red-600 font-semibold">MUST</span> be picked up within 10 days of the sale.
                    (By: <span className="font-semibold">8/11/2025</span>)
                  </li>
                  <li>All lots located in Stephenville, Texas.</li>
                  <li>Lot location is posted under consignor info on each lot.</li>
                  <li>
                    The contact info for each lot is listed in the consignor info at the bottom
                    of each lot page. Please use that information for questions regarding these lots.
                  </li>
                  <li>
                    All lots are selling as is where is with no warranty or guarantee unless otherwise noted.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-semibold text-center mb-10 italic">
            Thursday, July 31st Offerings
          </h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lots.map((lot) => (
              <div
                key={lot.id}
                className="bg-[#426C6B] text-white shadow-lg rounded-md p-4 w-80 hover:scale-105 transform transition duration-200"
              >
                <h2 className="font-bold">LOT {lot.id} - {lot.title}</h2>
                <p className="text-sm">{lot.pedigree}</p>
                <p className="text-red-400 font-semibold mt-2">
                  Bidding ENDS at {lot.biddingEnds}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
