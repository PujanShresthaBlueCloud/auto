import {
  EmojiHappyIcon,
  ChartSquareBarIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  AdjustmentsIcon,
  SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";
import benefitThreeImg from "../public/img/benefit-three.png";

const benefitOne = {
  title: "Highlight your benefits",
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumy.",
  // image: benefitOneImg,
  image: benefitThreeImg,
  bullets: [
    {
      title: "Understand your customers",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <EmojiHappyIcon />,
    },
    {
      title: "Improve acquisition",
      desc: "Here you can add the next benefit point.",
      icon: <ChartSquareBarIcon />,
    },
    {
      title: "Drive customer retention",
      desc: "This will be your last bullet point in this section.",
      icon: <CursorClickIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry  also contain an image or Illustration as above section along with some bullet points..",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Faster Processes",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <DeviceMobileIcon />,
    },
    {
      title: "24/7 Operation",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <AdjustmentsIcon />,
    },
    {
      title: "Increased Output",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
