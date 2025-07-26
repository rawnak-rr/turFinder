export default function DropdownMenu({
  isMenuOpen,
  toggleMenu,
  handleMenuItemClick,
}) {
  return (
    <>
      <div
        className={`fixed top-0 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md p-8 gap-6
                    flex flex-col items-center
                    bg-darkgreen/90 backdrop-blur-md rounded-2xl
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <ul className="flex flex-col items-center gap-4">
          <li
            onClick={() => handleMenuItemClick("/book")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            book your turf
          </li>
          <li
            onClick={() => handleMenuItemClick("/games")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            looking for games
          </li>
          <li
            onClick={() => handleMenuItemClick("/rating")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            personal rating
          </li>
          <li
            onClick={() => handleMenuItemClick("/about")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            about us
          </li>
        </ul>

        <ul className="flex flex-col items-center gap-4 mt-4">
          <li
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            instagram
          </li>
          <li
            onClick={() => window.open("https://facebook.com", "_blank")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            facebook
          </li>
          <li
            onClick={() => window.open("mailto:contact@turfinder.com")}
            className="text-beige font-redhatmono text-lg hover:text-yellow cursor-pointer duration-200">
            mail
          </li>
        </ul>

        <button
          onClick={toggleMenu}
          className="absolute top-3 right-4 text-beige hover:text-yellow text-lg font-redhatmono cursor-pointer duration-200">
          close
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
