"use client"

import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import parse from 'html-react-parser';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const id = useAppSelector((state) => state.userId);
  const username = useAppSelector((state) => state.username);
  const role = useAppSelector((state) => state.role);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  console.log("HHOOMME", id);
  console.log("HHOOMMEE UUSSEERRMMAE-----", username);
  console.log("HHOOMMEE ROLLEE-----", role);

  useEffect(() => {
    // Fetch flyer data from the backend
    const fetchFlyer = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/flyer/getFlyer`);
        console.log("Flyer data:------", response.data.flyers);

        setImage(response.data.flyers.imageUrl);
        setTitle(response.data.flyers.title);


        setDescription(response.data.flyers.description);

        console.log(image, 'description');

        // Handle the fetched flyer data as needed
      } catch (error) {
        console.error('Error fetching flyer data:', error);
      }
    };

    fetchFlyer();
  }, []);




  return (
    <div className="mx-5 my-3">
      {/* Hero Image */}
      <div className="">
        <img
          src={image}
          alt="Hero Image"
          className="mx-auto object-cover w-full lg:max-w-[500px]"
        />
      </div>

      <div className="flex flex-col items-center justify-center my-4 px-4 text-center">
        {/* Heading */}
        {/* <h1 className="text-4xl font-extrabold text-blue-900 lg:text-6xl">Yearling</h1>
        <h1 className="text-4xl font-extrabold text-blue-900 md:text-5xl lg:text-6xl mb-2">Performance Sale</h1> */}

        {/* Subtitle */}
        <p className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight drop-shadow-lg">
          {title}
        </p>

        {/* Sale Catalog */}
        {/* <a
          href="#"
          className="text-blue-900 font-bold underline hover:text-blue-700 text-lg"
        >
          View Sale Catalog
        </a>
        <p className="text-red-600 font-bold text-2xl mt-2">Wednesday</p>
        <p className="text-red-600 font-bold text-2xl mb-6">August 20th</p> */}

        {/* Contact Info */}
        {/* <div className="text-lg text-gray-800 mb-6">
          <p className="font-semibold">Jimmy Lathero</p>
          <p>(772) 321-3784</p>
          <p>Fellsmere, Florida</p>
        </div> */}

        <div className="">
          {parse(String(description))}
        </div>

        {/* Divider */}
        <hr className="w-full max-w-sm border-gray-300 mb-6" />

        {/* Past Sale Results */}
        <Link
          href="/underdevelopment"
          className="text-blue-900 font-bold underline hover:text-blue-700 text-lg"
        >
          View Past Sale Results
        </Link>

        {/* Divider */}
        <hr className="w-full max-w-sm border-gray-300 mt-6" />
      </div>
      <img src="/logo2.jpeg" alt="Hero Image" className="mx-auto object-cover w-full lg:max-w-[500px]" />

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
