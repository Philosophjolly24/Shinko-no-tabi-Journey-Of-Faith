// *Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
// * Component imports
import { Verse } from "./verse";
import { Passage } from "./passage";
// *Hooks
import { useRef } from "react";
import { useState } from "react";

// *Scripts
import "../style.css";
import data from "../scripts/script";
import { referenceLink, shuffle } from "../scripts/script";
import affirmations from "../scripts/affirmations";
import wallpapers from "../scripts/wallpapers";
// *html to png
import { toPng } from "html-to-image";

// let lastFetchDate: Date;

export default function SwiperPages() {
  let path;
  let verse;
  let passage;
  let affirmation;
  let storageData;
  let cachedData;
  const currentDate = new Date().toISOString().split("T")[0];

  shuffle(affirmations);
  shuffle(wallpapers);

  if (localStorage.getItem("lastFetchDate")) {
    const lastDate = localStorage.getItem("lastFetchDate");
    console.log(lastDate);
    cachedData = localStorage.getItem("cachedData");

    if (cachedData !== null) {
      storageData = JSON.parse(cachedData);
    }

    if (lastDate == currentDate) {
      path = storageData.wallpaperPath;
      verse = storageData.verse;
      passage = storageData.passage;
      affirmation = storageData.affirmation;
    } else {
      path = `/${wallpapers[0]}`;
      verse = data.verse;
      passage = data.passage;
      affirmation = affirmations[0];

      const obj = JSON.stringify({
        wallpaperPath: path,
        verse: data.verse,
        passage: data.passage,
        affirmation: affirmations[0],
      });
      localStorage.setItem("cachedData", obj);
      localStorage.setItem("lastFetchDate", currentDate);
    }
  } else {
    path = `/${wallpapers[0]}`;
    verse = data.verse;
    passage = data.passage;
    affirmation = affirmations[0];

    const obj = JSON.stringify({
      wallpaperPath: path,
      verse: data.verse,
      passage: data.passage,
      affirmation: affirmations[0],
    });
    localStorage.setItem("cachedData", obj);
    localStorage.setItem("lastFetchDate", currentDate);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const elementRef = useRef(null);

  const htmlToImageConvert = () => {
    if (!elementRef.current) {
      console.error("Element not found");
      return;
    }
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        hashNavigation
        onSlideChange={(slide) => setActiveIndex(slide.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <img className="logo" src="/cross.svg" alt="" />
          <h1 className="title">Verse of the day</h1>
          <main>
            <Verse>
              <strong>" </strong>
              {verse}
              <strong> "</strong>
            </Verse>
            <Passage>{passage}</Passage>
            <a href={referenceLink(`${passage}`)} className="link">
              READ MORE
            </a>
          </main>
        </SwiperSlide>

        <SwiperSlide>
          <>
            <img className="logo" src="/cross.svg" alt="" />
            <h1 className="title">Daily Affirmations</h1>
            <main>
              <div className="image-container" ref={elementRef}>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${path})` }}
                >
                  <div className="image-overlay">
                    <p className="image-text">{affirmation}</p>
                  </div>
                </div>
              </div>
              <button onClick={htmlToImageConvert}>
                <img className="download-icon" src="/download.svg" alt="" />
              </button>
            </main>
          </>
        </SwiperSlide>
      </Swiper>

      <div className="page-slider-section">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={activeIndex === i ? "circle-active" : "circle"}
          ></span>
        ))}
      </div>
    </>
  );
}
