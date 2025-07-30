"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// ===== CUSTOM SVG ICON COMPONENTS =====
// These replace Lucide React icons with custom SVG implementations
// You can modify these icons or replace them with your preferred icon library

const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const StarIcon = ({
  className = "w-4 h-4",
  filled = false,
  style,
}: {
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
    style={style}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const MapPinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const GridIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="7"
      height="7"></rect>
    <rect
      x="14"
      y="3"
      width="7"
      height="7"></rect>
    <rect
      x="14"
      y="14"
      width="7"
      height="7"></rect>
    <rect
      x="3"
      y="14"
      width="7"
      height="7"></rect>
  </svg>
);

const ListIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <line
      x1="8"
      y1="6"
      x2="21"
      y2="6"></line>
    <line
      x1="8"
      y1="12"
      x2="21"
      y2="12"></line>
    <line
      x1="8"
      y1="18"
      x2="21"
      y2="18"></line>
    <line
      x1="3"
      y1="6"
      x2="3.01"
      y2="6"></line>
    <line
      x1="3"
      y1="12"
      x2="3.01"
      y2="12"></line>
    <line
      x1="3"
      y1="18"
      x2="3.01"
      y2="18"></line>
  </svg>
);

const FilterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

// ===== TYPE DEFINITIONS =====
// Define the structure of a turf card for TypeScript type checking
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
function TurFindPage() {
  // ===== STATE MANAGEMENT =====
  // Controls for search functionality, view modes, and dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
  const [sortBy, setSortBy] = useState("recommended"); // Current sort option
  const [showSortDropdown, setShowSortDropdown] = useState(false); // Sort dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // Filter dropdown visibility

  // ===== GSAP ANIMATION REFS =====
  // References to DOM elements for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // ===== MOCK DATA =====
  // Sample turf data - replace this with your API call or database data
  const mockTurfs: TurfCard[] = [
    {
      id: 1,
      name: "Premium Turf",
      location: "Downtown",
      rating: 4.8,
      price: 150,
      image: "",
      distance: "0.5 miles away",
    },
    {
      id: 2,
      name: "City Sports",
      location: "Westside",
      rating: 4.6,
      price: 120,
      image: "",
      distance: "1.2 miles away",
    },
    {
      id: 3,
      name: "Elite Ground",
      location: "Northpark",
      rating: 4.9,
      price: 180,
      image: "",
      distance: "0.8 miles away",
    },
    {
      id: 4,
      name: "Victory Field",
      location: "Eastend",
      rating: 4.5,
      price: 100,
      image: "",
      distance: "2.1 miles away",
    },
    {
      id: 5,
      name: "Champion Arena",
      location: "Southside",
      rating: 4.7,
      price: 160,
      image: "",
      distance: "1.5 miles away",
    },
    {
      id: 6,
      name: "Sports Hub",
      location: "Central",
      rating: 4.4,
      price: 90,
      image: "",
      distance: "3.2 miles away",
    },
  ];

  // ===== SORT OPTIONS =====
  // Available sorting options for the dropdown - you can add more options here
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
    const tl = gsap.timeline();

    // Page load animations - staggered entrance effect
    tl.from(titleRef.current, {
      y: -50, // Start 50px above
      opacity: 1, // Start invisible
      duration: 0.8, // Animation duration
      ease: "back.out(1.7)", // Bouncy easing effect
    })
      .from(
        searchRef.current,
        {
          y: 30, // Start 30px below
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      ) // Start 0.4s before previous animation ends
      .from(
        controlsRef.current,
        {
          y: 20,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".turf-card",
        {
          y: 40,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1, // Delay each card by 0.1s
          ease: "power2.out",
        },
        "-=0.2"
      );

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
  const handleCardHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -8, // Lift up by 8px
      scale: 1.02, // Slightly scale up
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Handle card hover leave animation - return to normal
  const handleCardLeave = (e: React.MouseEvent) => {
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
    <div
      className="min-h-screen p-6 relative"
      style={{ backgroundColor: "#fbf9ed" }}>
      <div className="max-w-7xl mx-auto">
        {/* ===== PAGE HEADER ===== */}
        <h1
          ref={titleRef}
          className="text-6xl font-bold mb-8 mt-10 tracking-tight"
          style={{
            fontFamily: "PolySans, sans-serif",
            color: "#262626",
          }}>
          BOOK YOUR TURF!
        </h1>

        {/* ===== SEARCH SECTION ===== */}
        <div
          ref={searchRef}
          className="mb-8">
          <div className="relative max-w-2xl">
            {/* Search icon positioned absolutely inside input */}
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a turf"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl focus:outline-none transition-colors duration-300"
              style={{
                backgroundColor: "#fbf9ed",
                border: "3px solid #262626",
                fontFamily: "Red Hat Mono, monospace",
                color: "#262626",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e6c700")}
              onBlur={(e) => (e.target.style.borderColor = "#262626")}
            />
          </div>
        </div>

        {/* ===== CONTROLS SECTION ===== */}
        <div
          ref={controlsRef}
          className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* ===== VIEW TOGGLE BUTTONS ===== */}
            <div
              className="flex rounded-xl p-1"
              style={{
                backgroundColor: "#fcf6cb",
                border: "2px solid #262626",
              }}>
              {/* Grid view button */}
              <button
                onClick={handleViewToggle}
                className="p-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: isGridView ? "#e6c700" : "transparent",
                  color: "#262626",
                }}
                onMouseEnter={(e) => {
                  if (!isGridView)
                    e.currentTarget.style.backgroundColor =
                      "rgba(230, 199, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  if (!isGridView)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}>
                <GridIcon className="w-5 h-5" />
              </button>
              {/* List view button */}
              <button
                onClick={handleViewToggle}
                className="p-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: !isGridView ? "#e6c700" : "transparent",
                  color: "#262626",
                }}
                onMouseEnter={(e) => {
                  if (isGridView)
                    e.currentTarget.style.backgroundColor =
                      "rgba(230, 199, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  if (isGridView)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}>
                <ListIcon className="w-5 h-5" />
              </button>
            </div>

            {/* ===== SORT DROPDOWN ===== */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                style={{
                  backgroundColor: "#fcf6cb",
                  border: "2px solid #262626",
                  fontFamily: "Red Hat Mono, monospace",
                  color: "#262626",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e6c700")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fcf6cb")
                }>
                Sort By:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort dropdown menu - only visible when showSortDropdown is true */}
              {showSortDropdown && (
                <div
                  ref={sortDropdownRef}
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-lg z-50"
                  style={{
                    backgroundColor: "#fbf9ed",
                    border: "2px solid #262626",
                  }}>
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                        index === 0 ? "rounded-t-xl" : ""
                      } ${
                        index === sortOptions.length - 1 ? "rounded-b-xl" : ""
                      }`}
                      style={{
                        fontFamily: "Red Hat Mono, monospace",
                        backgroundColor:
                          sortBy === option.value ? "#e6c700" : "transparent",
                        color: "#262626",
                      }}
                      onMouseEnter={(e) => {
                        if (sortBy !== option.value)
                          e.currentTarget.style.backgroundColor = "#fcf6cb";
                      }}
                      onMouseLeave={(e) => {
                        if (sortBy !== option.value)
                          e.currentTarget.style.backgroundColor = "transparent";
                      }}>
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                style={{
                  backgroundColor: "#07ec72",
                  border: "2px solid #262626",
                  fontFamily: "Red Hat Mono, monospace",
                  color: "#262626",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#00694b";
                  e.currentTarget.style.color = "#fbf9ed";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#07ec72";
                  e.currentTarget.style.color = "#262626";
                }}>
                <FilterIcon className="w-4 h-4" />
                Filters
              </button>

              {/* Filter dropdown menu - contains price and rating filters */}
              {showFilterDropdown && (
                <div
                  ref={filterDropdownRef}
                  className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-lg z-50 p-4"
                  style={{
                    backgroundColor: "#fbf9ed",
                    border: "2px solid #262626",
                  }}>
                  <div className="space-y-4">
                    {/* Price range filter */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{
                          fontFamily: "Red Hat Mono, monospace",
                          color: "#262626",
                        }}>
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="flex-1 px-3 py-2 rounded-lg text-sm"
                          style={{
                            fontFamily: "Red Hat Mono, monospace",
                            border: "1px solid #262626",
                            color: "#262626",
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="flex-1 px-3 py-2 rounded-lg text-sm"
                          style={{
                            fontFamily: "Red Hat Mono, monospace",
                            border: "1px solid #262626",
                            color: "#262626",
                          }}
                        />
                      </div>
                    </div>
                    {/* Rating filter */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{
                          fontFamily: "Red Hat Mono, monospace",
                          color: "#262626",
                        }}>
                        Rating
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg text-sm"
                        style={{
                          fontFamily: "Red Hat Mono, monospace",
                          border: "1px solid #262626",
                          color: "#262626",
                        }}>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                        <option>Any Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== RESULTS COUNT ===== */}
          <div
            style={{
              color: "#262626",
              fontFamily: "Red Hat Mono, monospace",
            }}>
            {filteredTurfs.length} turfs found
          </div>
        </div>

        {/* ===== TURF CARDS GRID ===== */}
        <div
          ref={cardsRef}
          className={`grid gap-6 ${
            isGridView
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Grid layout
              : "grid-cols-1" // List layout
          }`}>
          {filteredTurfs.map((turf) => (
            <div
              key={turf.id}
              className="turf-card rounded-2xl p-6 cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "#fbf9ed",
                border: "3px solid #262626",
              }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}>
              {/* ===== TURF IMAGE PLACEHOLDER ===== */}
              {/* Replace this section with actual images when available */}
              <div
                className="w-full h-48 rounded-xl mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: "#fcf6cb",
                  border: "2px solid #262626",
                }}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(38, 38, 38, 0.1)" }}>
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: "rgba(38, 38, 38, 0.2)" }}></div>
                </div>
              </div>

              {/* ===== TURF INFORMATION ===== */}
              <div className="space-y-3">
                {/* Turf name and rating */}
                <div className="flex justify-between items-start">
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "PolySans, sans-serif",
                      color: "#262626",
                    }}>
                    {turf.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <StarIcon
                      className="w-4 h-4"
                      style={{ color: "#e6c700" }}
                      filled
                    />
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "Red Hat Mono, monospace",
                        color: "#262626",
                      }}>
                      {turf.rating}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div
                  className="flex items-center gap-2"
                  style={{ color: "rgba(38, 38, 38, 0.7)" }}>
                  <MapPinIcon className="w-4 h-4" />
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "Red Hat Mono, monospace",
                    }}>
                    {turf.location}
                  </span>
                </div>

                {/* Distance */}
                <div
                  className="text-sm"
                  style={{
                    fontFamily: "Red Hat Mono, monospace",
                    color: "rgba(38, 38, 38, 0.6)",
                  }}>
                  {turf.distance}
                </div>

                {/* Price and booking button */}
                <div className="flex justify-between items-center pt-2">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "PolySans, sans-serif",
                      color: "#262626",
                    }}>
                    ₹{turf.price}
                    <span
                      className="text-sm font-normal"
                      style={{
                        fontFamily: "Red Hat Mono, monospace",
                        color: "rgba(38, 38, 38, 0.6)",
                      }}>
                      /hour
                    </span>
                  </div>

                  {/* Book now button - add your booking logic here */}
                  <button
                    className="px-6 py-2 font-medium rounded-xl transition-colors duration-300"
                    style={{
                      backgroundColor: "#00694b",
                      color: "#fbf9ed",
                      fontFamily: "Red Hat Mono, monospace",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#014e38")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#00694b")
                    }>
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
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "PolySans, sans-serif",
                color: "#262626",
              }}>
              No turfs found
            </h3>
            <p
              style={{
                fontFamily: "Red Hat Mono, monospace",
                color: "rgba(38, 38, 38, 0.6)",
              }}>
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

export default TurFindPage;
