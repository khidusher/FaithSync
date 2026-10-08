import React from 'react';
import { useApp } from '../../context/AppContext';
import { CommunitySnapshotData } from '../../types';

interface CommunitySnapshotProps {
  data: CommunitySnapshotData;
}

export const CommunitySnapshot: React.FC<CommunitySnapshotProps> = ({ data }) => {
  const { setCurrentTab, friends } = useApp();

  const sampleAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCtB-NTriNfrebO6hfuiwdJ1sLmZbdb8nws_1Pt2v_dj6YjtFjVBCM0JfhnPHUCmYU6OmlxKk_xJGNKOYKiqMxP1rgfLCeDiahySjW3LJnlvRLc9itV5ep1Js147cJ9fcb9gnrFdTZnplY-yrtGfYxWjQXl41wQgcNjR80T7SggtMnxPMViBiUR_Ye6jC-TIAOdy7wViPpJC8U0mJ0_li1URS0aW_pw3OnFyU_OvdQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBGv-eodXSKoWyP595S03xZJHBItCiH5SECnebFDjk8mwZCfqwUDPDQ6JUumrapHNF39pA8MrSlyyQCyKEQnI-bLKXA7y0CpsMnq1G6w2VkMKI6XnajGxBtIBkEQZLUUipC56gURH43VMHgXwuqlJfv58fHFhA28qZdKDXCoMIrniunsWKZsfFyFjkpwPkdM7bTB7NisAFW4GhMt4oV8HB1MUY6VjR0zr7QSxu1N7A',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCo1x5rFNEoUZujph4cvbC7-lrq2PAXjdvVepcc8PWG93wzIg5PX2bGFXKnURFQRm9HqPfbaWzPDzRVdNSMZBUTsr5e3NOuo8-fcc4qwvQtFNu_-9MlcYhSxEF5vHjuh9Zaqs1LNgMCWAM302EzRdJkAqfXRSdqmSb5P0WdiHGKsQ0251mXtIBWNBJ6JruL6XUXUrQuuJygjsFNrzAMwSCga11qZaUV3jiugGrI5pE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDPenoBir1_LTPcSTbsdRxnmTFclUKEBTeXvWOySQywFbJZ10FOcDo-6GN4Ozy7ehHV4BTMiyelHWv8M8lbdry9wXtzur8Kn8G8KBy-xh-CC73r4P8x2RvRiUw1kwS8ONeLj4dzLNF_byQy81WJ27aZTgbzYuODp1BQye_-MoVPNt64qdO6ugYY89Hasw10jLAoYw72iahZ17olSxjGq5LIyY0154xyp5DgjgI2cqc'
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col gap-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">diversity_3</span>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2D2924]">Your Community</h3>
            <span className="text-[11px] text-[#A67C52] font-semibold">{data.churchName}</span>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 font-bold">
          Active Now
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
        See what your church community is engaging with, encourage friends in their quiet time, and walk together.
      </p>

      {/* Snapshot metrics */}
      <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] text-center">
        <div>
          <span className="block font-serif text-lg sm:text-xl font-bold text-[#6B4F2A]">
            {data.connectedMembersCount}
          </span>
          <span className="block text-[10px] text-[#766F67] font-semibold mt-0.5">Members</span>
        </div>
        <div className="border-x border-[#E6DCCB]">
          <span className="block font-serif text-lg sm:text-xl font-bold text-[#66805C]">
            {data.activeCirclesCount}
          </span>
          <span className="block text-[10px] text-[#766F67] font-semibold mt-0.5">Circles</span>
        </div>
        <div>
          <span className="block font-serif text-lg sm:text-xl font-bold text-[#D4A94D]">
            {data.sharedReflectionsToday}
          </span>
          <span className="block text-[10px] text-[#766F67] font-semibold mt-0.5">Prayed Today</span>
        </div>
      </div>

      {/* Avatars Stack & Circle note */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {sampleAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Member"
                className="w-7 h-7 rounded-full object-cover border-2 border-[#FFFDF8] shadow-2xs"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#766F67]">
            +{friends.length || 8} friends nearby
          </span>
        </div>

        <button
          onClick={() => setCurrentTab('friends')}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-1 shadow-xs"
          type="button"
        >
          <span>View Community</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
