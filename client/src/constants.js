import {
  FaLaptopCode,
  FaHeartbeat,
  FaPlane,
  FaChartLine,
  FaBookOpen,
  FaSmile,
  FaUtensils,
  FaFilm,
  FaFutbol,
  FaFlask,
  FaPaintBrush,
  FaLandmark,
  FaGavel,
  FaLeaf,
  FaBuilding,
  FaTshirt,
  FaCameraRetro,
  FaTools,
  FaBaby,
  FaEllipsisH,
} from "react-icons/fa";

import technology from "./assets/technology.jpg";
import health from "./assets/health.jpg";
import travel from "./assets/travel.jpg";
import finance from "./assets/finance.jpg";
import education from "./assets/education.jpg";
import lifestyle from "./assets/lifestyle.jpg";
import food from "./assets/food.jpg";
import entertainment from "./assets/entertainment.jpg";
import sports from "./assets/sports.jpg";
import science from "./assets/science.jpg";
import art from "./assets/art.jpg";
import history from "./assets/history.jpg";
import politics from "./assets/politics.jpg";
import environment from "./assets/environment.jpg";
import business from "./assets/business.jpg";
import fashion from "./assets/fashion.jpg";
import photography from "./assets/photography.jpg";
import diy from "./assets/DIY.jpg";
import parenting from "./assets/parenting.jpg";
import other from "./assets/other.jpg";

const BLOG_CATEGORIES = [
  {
    name: "Technology",
    icon: FaLaptopCode,
    image: technology,
    bg: "#E0F2FF",
    text: "#0284C7",
    iconColor: "#0369A1",
  },
  {
    name: "Health",
    icon: FaHeartbeat,
    image: health,
    bg: "#FFE4E6",
    text: "#E11D48",
    iconColor: "#BE123C",
  },
  {
    name: "Travel",
    icon: FaPlane,
    image: travel,
    bg: "#FEF9C3",
    text: "#CA8A04",
    iconColor: "#A16207",
  },
  {
    name: "Finance",
    icon: FaChartLine,
    image: finance,
    bg: "#ECFDF5",
    text: "#059669",
    iconColor: "#047857",
  },
  {
    name: "Education",
    icon: FaBookOpen,
    image: education,
    bg: "#EDE9FE",
    text: "#7C3AED",
    iconColor: "#5B21B6",
  },
  {
    name: "Lifestyle",
    icon: FaSmile,
    image: lifestyle,
    bg: "#FCE7F3",
    text: "#DB2777",
    iconColor: "#BE185D",
  },
  {
    name: "Food",
    icon: FaUtensils,
    image: food,
    bg: "#FFEDD5",
    text: "#EA580C",
    iconColor: "#C2410C",
  },
  {
    name: "Entertainment",
    icon: FaFilm,
    image: entertainment,
    bg: "#F3E8FF",
    text: "#9333EA",
    iconColor: "#7E22CE",
  },
  {
    name: "Sports",
    icon: FaFutbol,
    image: sports,
    bg: "#DCFCE7",
    text: "#16A34A",
    iconColor: "#15803D",
  },
  {
    name: "Science",
    icon: FaFlask,
    image: science,
    bg: "#D1FAE5",
    text: "#10B981",
    iconColor: "#059669",
  },
  {
    name: "Art",
    icon: FaPaintBrush,
    image: art,
    bg: "#FEE2E2",
    text: "#DC2626",
    iconColor: "#B91C1C",
  },
  {
    name: "History",
    icon: FaLandmark,
    image: history,
    bg: "#E0E7FF",
    text: "#4338CA",
    iconColor: "#3730A3",
  },
  {
    name: "Politics",
    icon: FaGavel,
    image: politics,
    bg: "#FEE2E2",
    text: "#DC2626",
    iconColor: "#B91C1C",
  },
  {
    name: "Environment",
    icon: FaLeaf,
    image: environment,
    bg: "#DCFCE7",
    text: "#15803D",
    iconColor: "#166534",
  },
  {
    name: "Business",
    icon: FaBuilding,
    image: business,
    bg: "#F0F9FF",
    text: "#0284C7",
    iconColor: "#0369A1",
  },
  {
    name: "Fashion",
    icon: FaTshirt,
    image: fashion,
    bg: "#FAE8FF",
    text: "#C026D3",
    iconColor: "#A21CAF",
  },
  {
    name: "Photography",
    icon: FaCameraRetro,
    image: photography,
    bg: "#FFE4E6",
    text: "#BE123C",
    iconColor: "#9F1239",
  },
  {
    name: "DIY",
    icon: FaTools,
    image: diy,
    bg: "#FDE68A",
    text: "#B45309",
    iconColor: "#92400E",
  },
  {
    name: "Parenting",
    icon: FaBaby,
    image: parenting,
    bg: "#FCE7F3",
    text: "#DB2777",
    iconColor: "#BE185D",
  },
  {
    name: "Other",
    icon: FaEllipsisH,
    image: other,
    bg: "#E2E8F0",
    text: "#475569",
    iconColor: "#334155",
  },
];

export { BLOG_CATEGORIES };