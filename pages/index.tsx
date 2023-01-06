import { useState, useEffect } from "react";
import styled from "styled-components";

// center of the window
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1<{ x: any; y: any }>`
  font-size: 60px;
  font-weight: 600;
  margin: 1rem;
  text-shadow: ${(props) => `${props.x / 100}px ${props.y / 60}px gray`};
`;

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const windowCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    };
    setWindowCenter(windowCenter);
  }, []);

  return (
    <Container>
      <Title
        x={mousePosition.x - windowCenter.x}
        y={mousePosition.y - windowCenter.y}
      >
        Home
      </Title>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>
    </Container>
  );
}
