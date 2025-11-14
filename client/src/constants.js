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
  { name: "Technology", icon: FaLaptopCode, image: technology },
  { name: "Health", icon: FaHeartbeat, image: health },
  { name: "Travel", icon: FaPlane, image: travel },
  { name: "Finance", icon: FaChartLine, image: finance },
  { name: "Education", icon: FaBookOpen, image: education },
  { name: "Lifestyle", icon: FaSmile, image: lifestyle },
  { name: "Food", icon: FaUtensils, image: food },
  { name: "Entertainment", icon: FaFilm, image: entertainment },
  { name: "Sports", icon: FaFutbol, image: sports },
  { name: "Science", icon: FaFlask, image: science },
  { name: "Art", icon: FaPaintBrush, image: art },
  { name: "History", icon: FaLandmark, image: history },
  { name: "Politics", icon: FaGavel, image: politics },
  { name: "Environment", icon: FaLeaf, image: environment },
  { name: "Business", icon: FaBuilding, image: business },
  { name: "Fashion", icon: FaTshirt, image: fashion },
  { name: "Photography", icon: FaCameraRetro, image: photography },
  { name: "DIY", icon: FaTools, image: diy },
  { name: "Parenting", icon: FaBaby, image: parenting },
  { name: "Other", icon: FaEllipsisH, image: other },
];

export { BLOG_CATEGORIES };