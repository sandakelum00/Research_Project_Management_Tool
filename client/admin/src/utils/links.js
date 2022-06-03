import React from "react";
import { IoBarChartSharp } from "react-icons/io5";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAddchart } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },

  {
    id: 2,
    text: "documents",
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
    text: "allocate panel",
    path: "panel-member",
    icon: <MdAddchart />,
  },

  {
    id: 5,
    text: "staff",
    path: "staff",
    icon: <FiUsers />,
  },

  {
    id: 6,
    text: "profile",
    path: "profile",
    icon: <GiPlagueDoctorProfile />,
  },
];

export default links;
