import React from "react";
import "../styles/HomeMenuButton.css";
import { Col } from "antd";
import { StepForwardOutlined } from "@ant-design/icons";

function HomeMenuButton({ text, onClick }) {
  return (
    <>
      <Col className="button-menu">
        <div className="center">
          <button className="btn" onClick={onClick}>
            <StepForwardOutlined
              style={{ marginRight: "8px", fontSize: "16px" }}
            />
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              className="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span>{text}</span>
          </button>
        </div>
      </Col>
    </>
  );
}

export default HomeMenuButton;
