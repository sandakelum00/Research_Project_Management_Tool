import React from "react";
import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import { GiPerpendicularRings } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { MdRemoveDone } from "react-icons/md";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "pending topics",
      count: stats.pending || 0,
      icon: <GiPerpendicularRings />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "accepted topics",
      count: stats.accept || 0,
      icon: <IoMdDoneAll />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "rejected topics",
      count: stats.reject || 0,
      icon: <MdRemoveDone />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
