import CategoryImg1 from "@/assets/images/category/category1.png";
import CategoryImg2 from "@/assets/images/category/category2.png";
import CategoryImg3 from "@/assets/images/category/category3.png";
import hotelImg from "@/assets/images/category/hotel.png";
import PrivateRoute from '@/routes/PrivateRoute';
import FavoriteScreen from '@/screens/user/FavoriteScreen';
import { CategoryType } from '@/types';
import React from 'react';

const CATEGORIES: CategoryType[] = [
  {
    id: "1",
    title: "Vegetable Burger",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg1,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Gulshan-1",
  },
  {
    id: "2",
    title: "Vegetable Kachchi",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg2,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Gulshan-2",
  },
  {
    id: "3",
    title: "Dream Coffee",
    description:
      "A veggie burger is a plant-based patty served in a burger bun, made from ingredients like vegetables legumes in beans.",
    hotelName: "Daily Daawat-Gulshan 1",
    hotelImage: hotelImg,
    image: CategoryImg3,
    discount: 20,
    date: "23 sep 2025",
    startTime: "03:00 PM",
    category: "New Deal",
    location: "Mohakhali C/A",
  },
];

export default function Favorite() {
  return (
    <PrivateRoute>
      <FavoriteScreen categories={CATEGORIES} />
    </PrivateRoute>
  )
}