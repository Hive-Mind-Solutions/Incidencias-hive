import React from "react";
import "../styles/HomeMenuButton.css";
import Button from "antd";

function HomeMenuButton({ text, onClick }) {
  return (
    <>
      <div class="container">
        <div class="center">
          <Button class="btn" onClick={onClick}>
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              class="border"
            >
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
            </svg>
            <span>HOVER ME</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeMenuButton;
