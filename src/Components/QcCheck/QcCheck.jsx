import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function QcCheck() {
  const location = useLocation();
  const state = location.state;
  console.log(state, "statedata");

  const correctCount = state.user.correctAssignmentCount;
  const incorrectCount = state.user.incorrectAssignmentCount;

  // Data for the pie chart
  const data = [
    { name: "Correct Assignment", value: correctCount },
    { name: "Incorrect Assignment", value: incorrectCount },
  ];

  const COLORS = ["green", "red"];

  const renderTooltip = (props) => {
    const { payload } = props;
    if (payload && payload.length) {
      const { name, value } = payload[0];
      const formType = name === "Correct Assignment" ? "correct" : "incorrect";
      return (
        <div style={{ backgroundColor: "white", padding: "5px", border: "1px solid black" }}>
          <p>{`${formType} forms: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  const totalForms = 480;

  // Calculate percentage for correct assignments
  const correctPercentage = (correctCount / totalForms) * 100;

  return (
    <div>
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
          // paddingTop: "100px",
          fontWeight: "700",
          color: "blue",

        }}
      >

          <Center style={{
            color: "teal",
            background : "#e6e6ff",
            display : "inline",
            padding : "5px",
            margin : "5px"
          }}>

            Cropton Services and Enterprises
          </Center>
        <Center>
          QC Report - {correctPercentage.toFixed(2)}% Accuracy
        </Center>

        <Center>
          <ResponsiveContainer width="80%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </Center>
        <Center style={{ color: "red" }}>
          Sorry Your QC is Failed!
        </Center>
        <hr style={{ backgroundColor: "gray", height: "2px" , margin : "5px" }} />
        <Center>
          Incorrect Form: {incorrectCount}
        </Center>
      </div>
    </div>
  );
}

export default QcCheck;
