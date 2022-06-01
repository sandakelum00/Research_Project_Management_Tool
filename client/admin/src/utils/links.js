import React from "react";
import { IoBarChartSharp } from "react-icons/io5";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },

  {
    id: 2,
    text: "all documents",
    path: "all-docs",
    icon: <HiOutlineDocumentReport />,
  },
  {
    id: 3,
    text: "add document",
    path: "add-doc",
    icon: <IoDocumentAttachOutline />,
  },

  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <GiPlagueDoctorProfile />,
  },
];

export default links;