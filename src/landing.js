import Link from "next/link";
export default function Landing() {
  return (
    <div className="bg-cardColor h-screen ">
      <div className=" w-full bg-cardColor">
        <div className="flex flex-wrap items-center justify-center p-4">
          <div className="flex items-center container-fluid mt-8">
            <img className="w-20" src="/logo.png" />
            <p className="text-4xl font-extrabold p-2">CryptoFile</p>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xl font-semibold  p-2 text-black">
            Encrypted file storage for Web3 lovers ❤️
          </span>
          <div className="text-center mt-10 mb-10">
            <ul className="inline-block text-left">
              <li> 📌 Sign up for free</li>
              <li>
                📌 Upload and download files securely with AES-256 encryption
              </li>
              <li>
                {" "}
                📌 No one on web can access your file without the file&apos;s
                password
              </li>
            </ul>
          </div>

          <div>
            <Link href="/api/auth/login">
              <button className="bg-buttonColor w-30 text-cardColor  font-bold py-2 px-4 border border-blue-700 rounded mr-2">
                Register/Login
              </button>
            </Link>
          </div>

          <div className="mt-10 mb-2">
            <span className="text-lg font-medium  pt-2 text-black">
              Powered By
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <img className="w-8 mr-2" src="/cockroach_logo.png" />
            <img className="w-8 mr-2" src="/filecoin_logo.png" />
            <img className="w-8 mr-2" src="/ipfs_logo.png" />
            <img className="w-8 mr-2" src="/web3storage_logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
