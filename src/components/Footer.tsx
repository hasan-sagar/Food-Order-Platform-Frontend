export default function Footer() {
  return (
    <footer className="bg-[#75A107] text-white py-4 px-3 mt-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <p className="text-xs md:text-sm text-center">
            Copyright 2024 &copy; All Rights Reserved
          </p>
        </div>
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
            <li>
              <a href="#">Contact</a>
            </li>
            <li className="mx-4">
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
