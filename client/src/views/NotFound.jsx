import notFoundImg from "../assets/404.png";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0FAFF] text-center ">
      <img
        src={notFoundImg}
        className="w-[250px] sm:w-[350px] md:w-[500px] mb-4"
      />

      <h1 className="text-4xl font-bold text-[#0077b6] mb-4">Page Not Found</h1>
      <p className="text-lg text-[#777]">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
    </div>
  );
}

export default NotFound;