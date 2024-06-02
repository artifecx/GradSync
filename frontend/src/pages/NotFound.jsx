import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="flex flex-col md:flex-col xl:flex-row w-100 px-4 py-20 sm:px-6 md:px-8 lg:px-10 bg-black">
            <div className="flex flex-col justify-center items-center px-4 py-20 md:px-8 lg:px-2 text-[#7A1515] w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-white">
                    404 - Not Found!
                </h1>
                <p className="text-base items-center sm:text-lg md:text-xl mt-8 mb-10 text-center text-white w-full max-w-[900px]">
                    Sorry! the page your are looking for was either not found or does not exist. Try refreshing the page or click the button below to go back to the home page.
                </p>
                <Link className="btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block" to="/jobs">Go to Home</Link>
            </div>

        </main>
    )
}

export default NotFound;