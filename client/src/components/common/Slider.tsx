import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import cp from "../../assets/cp.png";
import codeprops from "../../assets/codeprops.png";
import astronaut from "../../assets/astronaut.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [cp, codeprops, astronaut];
const imagess = [
  "https://res.cloudinary.com/dle6xv667/image/upload/v1682889469/nfokrizh0gevbib0f3mc.png",
  "https://res.cloudinary.com/dle6xv667/image/upload/v1682889469/nfokrizh0gevbib0f3mc.png",
  "https://res.cloudinary.com/dle6xv667/image/upload/v1682889469/nfokrizh0gevbib0f3mc.png",
  "https://res.cloudinary.com/dle6xv667/image/upload/v1682889469/nfokrizh0gevbib0f3mc.png",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type ImageSliderProps = {
  images: string[];
};

const Slider: React.FC<ImageSliderProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className="slider-img"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <ArrowForwardIosIcon sx={{ fontSize: "2vmin" }} />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <ArrowForwardIosIcon sx={{ fontSize: "2vmin" }} />
      </div>
    </>
  );
};

export default Slider;
