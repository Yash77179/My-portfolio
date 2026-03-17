"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, 
    damping: 20,    
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.9, 1] : [0.85, 1];
  };

  const rotate = useTransform(smoothProgress, [0, 1], [40, 0]);
  const scale = useTransform(smoothProgress, [0, 1], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[80rem] flex items-start justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative pt-20 md:pt-64"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center relative z-0 pointer-events-none"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        translateY: translate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-[22rem] sm:max-w-[30rem] md:max-w-[70rem] -mt-12 mx-auto h-[42rem] sm:h-[45rem] md:h-[55rem] w-full border-[6px] md:border-4 border-[#333333] p-1.5 md:p-6 bg-[#111111] rounded-[2.5rem] md:rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.6)] relative z-50 pointer-events-auto"
    >
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-black md:rounded-2xl relative">
        {/* We place a protective gradient that doesn't eat clicks */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),rgba(0,0,0,0.8))] pointer-events-none -z-10" />
        
        {/* Child content wrapped normally */}
        <div className="relative z-10 w-full h-full">
            {children}
        </div>
      </div>
    </motion.div>
  );
};
