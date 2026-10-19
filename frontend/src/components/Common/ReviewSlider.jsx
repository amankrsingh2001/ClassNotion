import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { courseApi } from "../../services/api";
import SectionHeader from "../ui/SectionHeader";

const Stars = ({ value = 0 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <FaStar key={i} className={`text-[13px] ${i <= Math.round(value) ? "text-citrus" : "text-foreground/15"}`} />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <figure className="glass w-[300px] sm:w-[360px] shrink-0 mr-5 p-6 flex flex-col gap-5">
    <figcaption className="flex items-center gap-3">
      <img
        className="w-11 h-11 shrink-0 rounded-full object-cover bg-surface-2"
        src={
          review?.user?.image
            ? review?.user?.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
        }
        alt="profile pic"
      />
      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">
          {review?.user?.firstName} {review?.user?.lastName}
        </p>
        <p className="text-xs text-foreground/45 truncate">{review?.course?.courseName}</p>
      </div>
    </figcaption>

    <div className="flex items-center gap-2">
      <Stars value={review?.rating} />
      <span className="text-xs font-medium text-foreground/55">{review?.rating?.toFixed(1)}</span>
    </div>

    <blockquote className="text-[15px] leading-relaxed text-foreground/75 line-clamp-4 break-words">
      &ldquo;{review?.review}&rdquo;
    </blockquote>
  </figure>
);

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { GET_ALL_REVIEWS } = courseApi;

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(GET_ALL_REVIEWS);
      if (response?.data?.success) {
        setReviews(response?.data?.data);
      }
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  // Repeat short lists so the marquee track is always wider than the viewport
  const base = reviews.length ? Array.from({ length: Math.max(1, Math.ceil(6 / reviews.length)) }, () => reviews).flat() : [];
  const track = [...base, ...base];
  const duration = `${Math.max(30, base.length * 7)}s`;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container-x">
        <SectionHeader
          center
          eyebrow="Real learners, real talk"
          title={<>Loved by <span className="text-gradient">learners</span></>}
          subtitle="What students are saying about their courses on ClassNotion."
        />
      </div>

      {loaded && reviews.length === 0 ? (
        <div className="container-x">
          <div className="mt-12 mx-auto max-w-md glass p-10 flex flex-col items-center text-center gap-3">
            <div className="relative">

              <span className="icon-circle-glass w-14 h-14"><FiMessageCircle className="text-xl" /></span>
            </div>
            <p className="text-lg font-medium tracking-tight">No reviews yet</p>
            <p className="text-sm text-foreground/55">Finish a course and be the first to share the love.</p>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="mt-12 flex gap-5 overflow-hidden mask-fade-x px-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="glass w-[300px] sm:w-[360px] shrink-0 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="skeleton w-11 h-11 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-2/3" />
                  <div className="skeleton h-3 w-1/2" />
                </div>
              </div>
              <div className="skeleton h-3 w-24" />
              <div className="space-y-2">
                <div className="skeleton h-3.5 w-full" />
                <div className="skeleton h-3.5 w-11/12" />
                <div className="skeleton h-3.5 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 overflow-hidden mask-fade-x group">
          <div
            className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: duration }}
          >
            {track.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSlider;
