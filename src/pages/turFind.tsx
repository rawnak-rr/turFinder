import { useState, useRef, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import SearchIcon from "../assets/icons/search.svg";
import YellowStarIcon from "../assets/icons/yellowstar.svg";
import MapPinIcon from "../assets/icons/map.svg";
import GridIcon from "../assets/icons/grid.svg";
import ListIcon from "../assets/icons/list.svg";
import FilterIcon from "../assets/icons/filter.svg";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import ClubVolta from "../assets/turfs/clubvolta.png";
import GSP from "../assets/turfs/gsp.png";
import Jaff from "../assets/turfs/jaff.png";
import KickOff from "../assets/turfs/kickoff.png";
import Metroplex from "../assets/turfs/metroplex.png";
import NorthArena from "../assets/turfs/northarena.png";

// ===== TYPE DEFINITIONS =====
interface TurfCard {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  distance: string;
}

// ===== MAIN COMPONENT - FUNCTION COMPONENT =====
export default function TurFindPage() {
  // ===== STATE MANAGEMENT =====
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
  const [sortBy, setSortBy] = useState("recommended"); // Current sort option
  const [showSortDropdown, setShowSortDropdown] = useState(false); // Sort dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // Filter dropdown visibility

  // ===== GSAP ANIMATION REFS =====
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // ===== MOCK DATA =====
  const mockTurfs: TurfCard[] = [
    {
      id: 1,
      name: "North Arena",
      location: "Sector-7, Uttara",
      rating: 4.8,
      price: 1500,
      image: NorthArena,
      distance: "0.5 km away",
    },
    {
      id: 2,
      name: "Club Volta",
      location: "Matikata Rd, Cantonment",
      rating: 4.6,
      price: 1200,
      image: ClubVolta,
      distance: "1.2 miles away",
    },
    {
      id: 3,
      name: "Galacticos Sports Pavilion (GSP)",
      location: "Sector-15, Uttara",
      rating: 4.9,
      price: 1800,
      image: GSP,
      distance: "0.8 miles away",
    },
    {
      id: 4,
      name: "Metroplex",
      location: "Khilkhet",
      rating: 4.5,
      price: 1000,
      image: Metroplex,
      distance: "2.1 miles away",
    },
    {
      id: 5,
      name: "KickOff",
      location: "300 Feet Road, Purbachal",
      rating: 4.7,
      price: 1600,
      image: KickOff,
      distance: "1.5 miles away",
    },
    {
      id: 6,
      name: "JAFF",
      location: "Bashundhara Gate",
      rating: 4.4,
      price: 2000,
      image: Jaff,
      distance: "3.2 miles away",
    },
  ];

  // ===== SORT OPTIONS =====
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Nearest First" },
  ];

  // ===== GSAP ANIMATIONS =====
  // Main animation effect that runs on component mount and dropdown state changes
  useEffect(() => {
    // Dropdown animations - only animate when dropdowns become visible
    if (showSortDropdown && sortDropdownRef.current) {
      gsap.from(sortDropdownRef.current, {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (showFilterDropdown && filterDropdownRef.current) {
      gsap.from(filterDropdownRef.current, {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [showSortDropdown, showFilterDropdown]); // Re-run when dropdown states change

  // ===== EVENT HANDLERS =====

  // Handle view toggle between grid and list layout
  const handleViewToggle = () => {
    setIsGridView(!isGridView);
    // Animate cards when view changes
    gsap.from(".turf-card", {
      scale: 0.9, // Start slightly smaller
      opacity: 1,
      duration: 0.3,
      stagger: 0.05, // Quick stagger effect
      ease: "power2.out",
    });
  };

  // Handle card hover animation - lift effect
  const handleCardHover = (e: MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -8, // Lift up by 8px
      scale: 1.02, // Slightly scale up
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Handle card hover leave animation - return to normal
  const handleCardLeave = (e: MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: 0, // Return to original position
      scale: 1, // Return to original scale
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // ===== DATA FILTERING =====
  // Filter turfs based on search term - searches both name and location
  const filteredTurfs = mockTurfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== COMPONENT RENDER =====
  return (
    <div className="w-full min-h-screen bg-almostwhite px-30 py-5 relative">
      <div>
        {/* ===== PAGE HEADER ===== */}
        <h1
          ref={titleRef}
          className="font-polysans text-6xl font-bold text-almostblack mb-8 mt-10 tracking-tight">
          BOOK YOUR TURF!
        </h1>

        {/* ===== SEARCH SECTION ===== */}
        <div
          ref={searchRef}
          className="mb-8">
          <div className="relative max-w-lg">
            {/* Search icon positioned absolutely inside input */}
            <img
              src={SearchIcon}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7"
            />
            <input
              type="text"
              placeholder="Search for a turf"
              value={searchTerm}
              onChange={(input) => setSearchTerm(input.target.value)}
              className="w-full pl-13 pr-4 py-4 text-lg rounded-2xl transition-colors duration-300
                         bg-almostwhite border-3 border-solid border-almostblack focus:outline-none focus:ring-2
                         font-redhatmono text-almostblack"
            />
          </div>
        </div>

        {/* ===== CONTROLS SECTION ===== */}
        <div
          ref={controlsRef}
          className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* ===== VIEW TOGGLE BUTTONS ===== */}
            <div className="flex rounded-xl p-1 bg-beige border-2 border-solid border-almostblack">
              {/* Grid view button */}
              <button
                onClick={handleViewToggle}
                className={`p-3 rounded-lg transition-all duration-300 cursor-pointer
                          ${isGridView ? "bg-yellow" : "bg-transparent"}`}>
                <img
                  src={GridIcon}
                  className="w-5"
                />
              </button>
              {/* List view button */}
              <button
                onClick={handleViewToggle}
                className={`p-3 rounded-lg transition-all duration-300 cursor-pointer
                          ${!isGridView ? "bg-yellow" : "bg-transparent"}`}>
                <img
                  src={ListIcon}
                  className="w-5"
                />
              </button>
            </div>

            {/* ===== SORT DROPDOWN ===== */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-300 cursor-pointer
                           bg-beige border-2 border-solid border-almostblack hover:bg-yellow
                           font-redhatmono text-almostblack">
                Sort By:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
                <img
                  src={ArrowDownIcon}
                  className={`w-5 transition-transform duration-300 ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort dropdown menu - only visible when showSortDropdown is true */}
              {showSortDropdown && (
                <div
                  ref={sortDropdownRef}
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-lg z-50
                             bg-almostwhite border-2 border-solid border-almostblack">
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors duration-200 
                                  font-redhatmono text-almostblack cursor-pointer
                                  ${
                                    sortBy === option.value
                                      ? "bg-yellow"
                                      : "bg-almostwhite hover:bg-beige"
                                  }
                                  ${index === 0 ? "rounded-t-xl" : ""}
                                  ${
                                    index === sortOptions.length - 1
                                      ? "rounded-b-xl"
                                      : ""
                                  }
                                `}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== FILTER DROPDOWN ===== */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors duration-300 cursor-pointer
                           bg-lightgreen border-2 border-solid border-almostblack hover:bg-green hover:text-almostwhite
                           font-redhatmono text-almostblack">
                <img
                  src={FilterIcon}
                  className="w-6"
                />
                Filters
              </button>

              {/* Filter dropdown menu - contains price and rating filters */}
              {showFilterDropdown && (
                <div
                  ref={filterDropdownRef}
                  className="absolute top-full left-0 mt-2 w-70 rounded-xl shadow-lg z-50 p-4
                             bg-almostwhite border-2 border-solid border-almostblack">
                  <div className="space-y-4">
                    {/* Price range filter */}
                    <div>
                      <label className="block font-redhatmono text-sm font-medium text-almostblack mb-2">
                        Price Range
                      </label>
                      <div className="flex justify-evenly gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                     border-1 border-solid border-almostblack"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                     border-1 border-solid border-almostblack"
                        />
                      </div>
                    </div>
                    {/* Rating filter */}
                    <div>
                      <label className="block font-redhatmono text-sm font-medium text-almostblack mb-2">
                        Rating
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                   border-1 border-solid border-almostblack cursor-pointer">
                        <option>Any Rating</option>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                        <option>2+ Stars</option>
                        <option>1+ Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== RESULTS COUNT ===== */}
          <div className="font-redhatmono text-almostblack">
            {filteredTurfs.length} turfs found
          </div>
        </div>

        {/* ===== TURF CARDS GRID ===== */}
        <div
          ref={cardsRef}
          className={`grid gap-6
                      ${
                        isGridView
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Grid layout
                          : "grid-cols-1" // List layout
                      }`}>
          {filteredTurfs.map((turf) => (
            <div
              key={turf.id}
              className="turf-card rounded-2xl p-6 cursor-pointer transition-shadow duration-300 hover:shadow-lg
                         bg-beige border-3 border-solid border-almostblack"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}>
              {/* ===== TURF IMAGE PLACEHOLDER ===== */}
              {/* Replace this section with actual images when available */}
              <div
                className="w-full h-48 rounded-xl mb-4 flex items-center justify-center
                           bg-almostwhite border-2 border-solid border-almostblack">
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-full object-cover object-bottom"
                />
              </div>

              {/* ===== TURF INFORMATION ===== */}
              <div className="space-y-3">
                {/* Turf name and rating */}
                <div className="flex justify-between items-start">
                  <h3 className="font-polysans text-xl font-bold text-almostblack">
                    {turf.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <img
                      src={YellowStarIcon}
                      className="w-5"
                    />
                    <span className="font-redhatmono text-sm font-medium text-almostblack">
                      {turf.rating}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <img
                    src={MapPinIcon}
                    className="w-5 -ml-1"
                  />
                  <span className="font-redhatmono text-sm text-almostblack/80">
                    {turf.location}
                  </span>
                </div>

                {/* Distance */}
                <div className="font-redhatmono text-sm text-almostblack/60">
                  {turf.distance}
                </div>

                {/* Price and booking button */}
                <div className="flex justify-between items-center pt-2">
                  <div className="font-polysans text-2xl font-bold text-almostblack">
                    &#2547;{turf.price}
                    <span className="font-redhatmono text-sm font-normal text-almostblack/80">
                      /hour
                    </span>
                  </div>

                  {/* Book now button - add your booking logic here */}
                  <button
                    className="px-6 py-2 font-medium rounded-xl transition-colors duration-300
                               bg-green font-redhatmono text-almostwhite cursor-pointer
                               hover:bg-darkgreen active:bg-darkgreen/80">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== NO RESULTS STATE ===== */}
        {/* Shown when no turfs match the search criteria */}
        {filteredTurfs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="font-polysans text-2xl font-bold text-almostblack mb-2">
              No turfs found
            </h3>
            <p className="font-redhatmono text-almostblack/70">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* ===== CLICK OUTSIDE OVERLAY ===== */}
      {/* Invisible overlay that closes dropdowns when clicked */}
      {(showSortDropdown || showFilterDropdown) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowSortDropdown(false);
            setShowFilterDropdown(false);
          }}
        />
      )}
    </div>
  );
}
