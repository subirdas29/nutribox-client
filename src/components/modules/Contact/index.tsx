// pages/contact.js
import Head from 'next/head';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for any queries or support." />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Message</label>
            <textarea
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Your Message"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}