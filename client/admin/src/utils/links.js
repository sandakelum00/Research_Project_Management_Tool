import React from "react";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "add document",
    path: "add-doc",
    icon: <IoDocumentAttachOutline />,
  },
  // {
  //   id: 3,
  //   text: "add job",
  //   path: "add-job",
  //   icon: <FaWpforms />,
  // },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
