import React from 'react';

export const NavBar = () => {
    return (
        <div className="w-80 h-14 relative shadow-[0px_2.4653310775756836px_2.4653310775756836px_0px_rgba(0,0,0,0.25)]">
            <div className="w-40 h-14 left-0 top-0 absolute bg-neutral-800 rounded-2xl" />
            <div className="w-44 h-14 left-[140.03px] top-0 absolute bg-emerald-900 rounded-2xl" />
            <div className="w-16 h-8 left-[152.85px] top-[12.82px] absolute bg-neutral-800 rounded-[49.31px]" />
            <div className="w-7 h-7 left-[271.68px] top-[12.33px] absolute bg-emerald-800 rounded-lg" />
            <div className="w-7 h-7 left-[233.22px] top-[12.33px] absolute bg-emerald-800 rounded-lg" />
            <div className="w-3 h-0 left-[200.18px] top-[28.01px] absolute outline outline-offset-[-0.49px] outline-amber-100" />
            <div className="w-3 h-0 left-[200.18px] top-[25.64px] absolute outline outline-offset-[-0.49px] outline-amber-100"></div>
            <div className="w-3 h-0 left-[200.18px] top-[31.56px] absolute outline outline-offset-[-0.49px] outline-amber-100"></div>
            <div className="w-7 h-3 left-[168.63px] top-[22.68px] absolute text-center justify-center text-amber-100 text-[9.86px] font-semibold font-sans">Menu</div>
            <div className="w-24 h-3.5 left-[29.09px] top-[21.20px] absolute text-center justify-center text-amber-100 text-lg font-semibold font-sans">turFinder*</div>
        </div>
    );
};

const NavTabs = () => {
    return (
        <div className="w-80 h-14 relative shadow-[0px_2.4653310775756836px_2.4653310775756836px_0px_rgba(0,0,0,0.25)]">
            <div className="w-40 h-14 left-0 top-0 absolute bg-neutral-800 rounded-2xl" />
            <div className="w-44 h-14 left-[140.03px] top-0 absolute bg-emerald-900 rounded-2xl" />
        </div>
    );
}
