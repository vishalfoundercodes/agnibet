
// export default CustomCaptcha;

import { useRef, useState, useEffect } from "react";

function CustomCaptcha({ onVerified, onClose }) {
  const [show, setShow] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verified, setVerified] = useState(false);
  const [ballInGoal, setBallInGoal] = useState(false);
  const [goalPosition, setGoalPosition] = useState(
    () => ["left", "right", "center"][Math.floor(Math.random() * 3)]
  );
  const sliderRef = useRef(null);

  const startDrag = (e) => {
    setDragging(true);
  };

  const stopDrag = () => {
    if (!dragging) return;
    setDragging(false);

    // Use different progress check based on goal position
    const goalReached =
      goalPosition === "center"
        ? progress >= 60 && progress <= 95 // Center goal
        : progress >= 70 && progress <= 95; // Left/Right goal

    if (goalReached) {
      setBallInGoal(true);
      triggerGoalAnimation();
    } else {
      // Reset if missed
      setTimeout(() => {
        setProgress(0);
      }, 300);
    }
  };

  const onDrag = (e) => {
    if (!dragging) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    let percentage = ((clientX - rect.left) / rect.width) * 100;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Flip progress if goal is on left side
    if (goalPosition === "left") {
      percentage = 100 - percentage;
    }

    setProgress(percentage);
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    onDrag(e);
  };

  const triggerGoalAnimation = () => {
    setTimeout(() => {
      setVerified(true);

      // Wait for goal animation to complete before notifying parent
      setTimeout(() => {
        if (typeof onVerified === "function") {
          onVerified();
        }

        // Close captcha after animation
        setTimeout(() => {
          setShow(false);
          if (typeof onClose === "function") {
            onClose();
          }
        }, 1500);
      }, 1200);
    }, 600);
  };

  const resetCaptcha = () => {
    setShow(true);
    setVerified(false);
    setProgress(0);
    setDragging(false);
    setBallInGoal(false);
    const allPositions = ["left", "right", "center"];
    const otherPositions = allPositions.filter((pos) => pos !== goalPosition);
    const newPosition =
      otherPositions[Math.floor(Math.random() * otherPositions.length)];
    setGoalPosition(newPosition);
  };

  const handleClose = () => {
    setShow(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (dragging) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, [dragging]);

  if (!show) {
    return null;
  }

  // Calculate ball position - smooth parabolic arc throughout
  const getBallPosition = () => {
    const normalizedProgress = Math.min(progress / 100, 1);

    let ballX;
    if (goalPosition === "right") {
      ballX = 5 + progress * 0.78;
    } else if (goalPosition === "left") {
      ballX = 95 - progress * 0.78;
    } else {
      ballX = 20 + progress * 0.53; // Your custom path
    }

    let ballY;
    if (goalPosition === "center") {
      if (progress < 85) {
        const t = normalizedProgress / 0.85;
        ballY = 20 + Math.sin(t * Math.PI) * 30;
      } else {
        ballY = 28;
      }
    } else {
      if (progress < 85) {
        const t = normalizedProgress / 0.85;
        ballY = 20 + Math.sin(t * Math.PI) * 28;
      } else {
        ballY = 30;
      }
    }

    return { x: ballX, y: ballY };
  };

  const ballPos = getBallPosition();

  // Separate detection for center vs left/right goals
  const isNearGoal = progress >= 70 && progress <= 95; // For left/right
  const isNearGoalCenter = progress >= 60 && progress <= 95; // For center

  // Use the correct detection based on goal position
  const isGoalActive =
    goalPosition === "center" ? isNearGoalCenter : isNearGoal;

  const getCirclePosition = () => {
    if (goalPosition === "left") {
      return {
        left: isNearGoal ? "28%" : "28%",
        right: "auto",
        top: "54%",
      };
    } else if (goalPosition === "right") {
      return {
        left: "auto",
        right: isNearGoal ? "28%" : "28%",
        top: "54%",
      };
    } else {
      // CENTER: Circle at 45% (no transform needed since we calculate exact position)
      return {
        left: "45%",
        right: "auto",
        top: isNearGoal ? "45%" : "45%",
        transform: "translateX(0%)", // No centering transform
      };
    }
  };

  const circlePos = getCirclePosition();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        padding: "20px",
      }}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrag}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "516px",
          background: "white",
          padding: "clamp(16px, 4vw, 24px)",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "28px",
            color: "#9ca3af",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            lineHeight: "1",
          }}
          onClick={handleClose}
        >
          ×
        </button>

        <h2
          style={{
            fontSize: "clamp(18px, 4vw, 24px)",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#2c5f8d",
            paddingRight: "40px",
          }}
        >
          Confirm you're not a robot
        </h2>
        <p
          style={{
            marginBottom: "clamp(16px, 3vw, 20px)",
            color: "#6b7280",
            fontSize: "clamp(13px, 3vw, 15px)",
          }}
        >
          Drag the slider to score a goal in the circle ⚽
        </p>

        {/* Stadium Scene */}
        <div
          style={{
            width: "100%",
            height: "clamp(220px, 45vw, 320px)",
            position: "relative",
            marginBottom: "clamp(16px, 3vw, 20px)",
            background:
              "linear-gradient(180deg, #1a2f4a 0%, #2c5f8d 50%, #87a7c4 100%)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Stars */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${5 + Math.random() * 35}%`,
                left: `${5 + i * 6.5}%`,
                color: "white",
                fontSize: `${6 + Math.random() * 4}px`,
                opacity: 0.9,
              }}
            >
              ★
            </div>
          ))}

          {/* Stadium Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "linear-gradient(180deg, #c5d5e4 0%, #dae5ed 100%)",
            }}
          ></div>

          {/* Goal Net */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "12%",
              width: "70%",
              maxWidth: "420px",
              height: "55%",
              border: "5px solid white",
              borderBottom: "none",
              borderRadius: "14px 14px 0 0",
              background: ballInGoal
                ? "linear-gradient(180deg, rgba(34,197,94,0.6) 0%, rgba(34,197,94,0.4) 100%)"
                : "linear-gradient(180deg, rgba(44,95,141,0.3) 0%, rgba(44,95,141,0.1) 100%)",
              zIndex: 1,
              transition: "all 0.5s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(255,255,255,0.6) 14px, rgba(255,255,255,0.6) 16px),
                repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,0.6) 14px, rgba(255,255,255,0.6) 16px)
              `,
              }}
            ></div>

            {/* Goal Posts */}
            <div
              style={{
                position: "absolute",
                left: "-5px",
                top: 0,
                bottom: "-5px",
                width: "5px",
                background: "white",
                borderRadius: "3px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: "-5px",
                top: 0,
                bottom: "-5px",
                width: "5px",
                background: "white",
                borderRadius: "3px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "-5px",
                right: 0,
                height: "5px",
                background: "white",
                borderRadius: "3px",
              }}
            ></div>
          </div>

          {/* Goal Target Circle */}
          <div
            style={{
              position: "absolute",
              left: circlePos.left,
              right: circlePos.right,
              top: circlePos.top,
              transform: circlePos.transform || "none",
              width: "clamp(70px, 16vw, 100px)",
              height: "clamp(70px, 16vw, 100px)",
              borderRadius: "50%",
              border: `5px ${isGoalActive ? "solid" : "dashed"} ${
                isGoalActive ? "#22c55e" : "rgba(107,166,255,0.8)"
              }`,
              background: ballInGoal
                ? "radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.4) 70%)"
                : isGoalActive
                ? "radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.2) 70%)"
                : "radial-gradient(circle, rgba(150,200,255,0.4) 0%, rgba(150,200,255,0.1) 70%)",
              zIndex: 2,
              boxShadow: ballInGoal
                ? "0 0 70px rgba(34,197,94,1), inset 0 0 50px rgba(34,197,94,0.7)"
                : isGoalActive
                ? "0 0 40px rgba(34,197,94,0.8)"
                : "0 0 25px rgba(150,200,255,0.5)",
              transition: "all 0.4s ease",
              animation: isGoalActive
                ? "pulse 0.6s ease-in-out infinite"
                : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                background: isGoalActive ? "#22c55e" : "rgba(150,200,255,0.9)",
                borderRadius: "50%",
                boxShadow: isGoalActive
                  ? "0 0 20px rgba(34,197,94,1)"
                  : "0 0 10px rgba(150,200,255,0.7)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {isGoalActive ? "✓" : "○"}
            </div>

            <div
              style={{
                position: "absolute",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                border: `3px ${isGoalActive ? "solid" : "dashed"} ${
                  isGoalActive ? "#22c55e" : "rgba(150,200,255,0.6)"
                }`,
                transition: "all 0.3s ease",
              }}
            ></div>
          </div>

          {/* Goalkeeper */}
          <div
            style={{
              position: "absolute",
              left:
                goalPosition === "right"
                  ? "23%"
                  : goalPosition === "center"
                  ? "65%"
                  : "auto",
              right: goalPosition === "left" ? "23%" : "auto",
              bottom: "10%",
              transform: verified
                ? goalPosition === "right"
                  ? "translateX(150%) translateY(-30%) rotate(45deg) scale(1.1)"
                  : goalPosition === "left"
                  ? "translateX(-150%) translateY(-30%) rotate(-45deg) scale(1.1)"
                  : "translateX(150%) translateY(-30%) rotate(45deg) scale(1.1)"
                : "translateX(0)",
              width: "clamp(40px, 9vw, 55px)",
              height: "clamp(60px, 13vw, 80px)",
              zIndex: 3,
              transition: "all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              style={{
                width: "40%",
                paddingBottom: "40%",
                background: "#ffdbac",
                borderRadius: "50%",
                position: "absolute",
                top: 0,
                left: "30%",
                border: "2px solid #d4a574",
              }}
            ></div>
            <div
              style={{
                width: "70%",
                height: "42%",
                background: "#e74c3c",
                position: "absolute",
                top: "36%",
                left: "15%",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "25%",
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "white",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "white",
                }}
              ></div>
            </div>
            <div
              style={{
                width: "26%",
                height: "24%",
                background: "#34495e",
                position: "absolute",
                bottom: 0,
                left: "22%",
                borderRadius: "0 0 3px 3px",
              }}
            ></div>
            <div
              style={{
                width: "26%",
                height: "24%",
                background: "#34495e",
                position: "absolute",
                bottom: 0,
                right: "22%",
                borderRadius: "0 0 3px 3px",
              }}
            ></div>
            <div
              style={{
                width: "32%",
                paddingBottom: "32%",
                background: "#9b59b6",
                borderRadius: "50%",
                position: "absolute",
                top: "42%",
                left: "-12%",
                border: "2px solid #8e44ad",
              }}
            ></div>
            <div
              style={{
                width: "32%",
                paddingBottom: "32%",
                background: "#9b59b6",
                borderRadius: "50%",
                position: "absolute",
                top: "42%",
                right: "-12%",
                border: "2px solid #8e44ad",
              }}
            ></div>
          </div>

          {/* Football */}
          <div
            style={{
              width: "clamp(40px, 9vw, 55px)",
              height: "clamp(40px, 9vw, 55px)",
              position: "absolute",
              bottom: `${ballPos.y}%`,
              left: `${ballPos.x}%`,
              transition: ballInGoal
                ? "all 0.8s cubic-bezier(0.2, 0.8, 0.3, 1)"
                : progress >= 85
                ? "none"
                : "bottom 0.08s ease-out, left 0.08s linear",
              transform: `translate(-50%, 50%) rotate(${
                progress * 6
              }deg) scale(${ballInGoal ? 0.4 : 1})`,
              zIndex: ballInGoal ? 5 : 4,
              filter: ballInGoal ? "blur(3px)" : "none",
              opacity: ballInGoal ? 0.3 : 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "white",
                borderRadius: "50%",
                border: "3px solid #333",
                position: "relative",
                overflow: "hidden",
                boxShadow: isGoalActive
                  ? "0 0 25px rgba(34,197,94,0.8), 0 8px 16px rgba(0,0,0,0.5)"
                  : "0 8px 16px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "22%",
                  width: "45%",
                  height: "45%",
                  background: "#333",
                  clipPath:
                    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "8%",
                  right: "12%",
                  width: "28%",
                  height: "28%",
                  background: "#333",
                  clipPath:
                    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  transform: "rotate(35deg)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "8%",
                  left: "12%",
                  width: "28%",
                  height: "28%",
                  background: "#333",
                  clipPath:
                    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  transform: "rotate(-20deg)",
                }}
              ></div>
            </div>
          </div>

          {/* Ball trail effect */}
          {isGoalActive && !ballInGoal && (
            <div
              style={{
                position: "absolute",
                bottom: `${ballPos.y}%`,
                left: `${ballPos.x - 5}%`,
                width: "clamp(30px, 7vw, 45px)",
                height: "clamp(30px, 7vw, 45px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)",
                transform: "translate(-50%, 50%)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            ></div>
          )}

          {/* Goal Text */}
          {verified && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "clamp(36px, 10vw, 64px)",
                fontWeight: "900",
                color: "#ffd700",
                textShadow:
                  "0 0 35px rgba(0,0,0,1), 0 0 25px rgba(255,215,0,1), 0 6px 12px rgba(0,0,0,0.7)",
                animation: "goalPop 0.8s ease-out",
                zIndex: 10,
                whiteSpace: "nowrap",
              }}
            >
              GOAL!!! 🎉
            </div>
          )}
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          style={{
            width: "100%",
            height: "clamp(52px, 12vw, 66px)",
            background:
              goalPosition === "right"
                ? "linear-gradient(to right, #93c5fd 0%, #60a5fa 35%, #3b82f6 70%, #22c55e 100%)"
                : goalPosition === "left"
                ? "linear-gradient(to left, #93c5fd 0%, #60a5fa 35%, #3b82f6 70%, #22c55e 100%)"
                : "linear-gradient(to right, #93c5fd 0%, #60a5fa 20%, #3b82f6 45%, #22c55e 70%, #3b82f6 85%, #60a5fa 100%)",
            borderRadius: "33px",
            position: "relative",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left:
                goalPosition === "right"
                  ? 0
                  : goalPosition === "center"
                  ? 0
                  : "auto",
              right: goalPosition === "left" ? 0 : "auto",
              top: 0,
              bottom: 0,
              width: `${progress}%`,
              background: isGoalActive
                ? "linear-gradient(to right, rgba(59,130,246,0.6), rgba(34,197,94,0.9))"
                : "linear-gradient(to right, rgba(59,130,246,0.5), rgba(96,165,250,0.6))",
              borderRadius: "33px",
              boxShadow: isGoalActive ? "0 0 25px rgba(34,197,94,0.7)" : "none",
              transition: "all 0.3s ease",
            }}
          ></div>

          {/* <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(12px, 3vw, 14px)",
              color: "white",
              fontWeight: "700",
              opacity: 0.8,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {Math.round(progress)}%
          </div> */}

          <div
            style={{
              position: "absolute",
              left:
                goalPosition === "right"
                  ? "clamp(18px, 4vw, 28px)"
                  : goalPosition === "center"
                  ? "clamp(18px, 4vw, 28px)"
                  : "auto",
              right:
                goalPosition === "left" ? "clamp(18px, 4vw, 28px)" : "auto",
              fontSize: "clamp(20px, 5vw, 26px)",
              color: "white",
              fontWeight: "bold",
              opacity: 0.9,
            }}
          >
            {goalPosition === "left" ? "←" : "→"}
          </div>
          <div
            style={{
              position: "absolute",
              right:
                goalPosition === "right"
                  ? "clamp(18px, 4vw, 28px)"
                  : goalPosition === "center"
                  ? "clamp(18px, 4vw, 28px)"
                  : "auto",
              left: goalPosition === "left" ? "clamp(18px, 4vw, 28px)" : "auto",
              fontSize: "clamp(20px, 5vw, 26px)",
              color: "white",
              fontWeight: "bold",
              opacity: 0.95,
            }}
          >
            🎯
          </div>

          <div
            style={{
              width: "clamp(60px, 13vw, 76px)",
              height: "clamp(60px, 13vw, 76px)",
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              left:
                goalPosition === "right"
                  ? `calc(${progress}% - clamp(30px, 6.5vw, 38px))`
                  : goalPosition === "center"
                  ? `calc(${progress}% - clamp(30px, 6.5vw, 38px))`
                  : "auto",
              right:
                goalPosition === "left"
                  ? `calc(${progress}% - clamp(30px, 6.5vw, 38px))`
                  : "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: dragging ? "grabbing" : "grab",
              boxShadow: isGoalActive
                ? "0 10px 30px rgba(34,197,94,0.7), 0 0 0 6px rgba(34,197,94,0.4)"
                : "0 10px 25px rgba(0,0,0,0.4)",
              border: `5px solid ${isGoalActive ? "#22c55e" : "#3b82f6"}`,
              userSelect: "none",
              touchAction: "none",
              transition: dragging ? "none" : "all 0.3s ease",
              zIndex: 5,
              transform: isGoalActive ? "scale(1.05)" : "scale(1)",
            }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div
              style={{
                fontSize: "clamp(26px, 7vw, 36px)",
                transition: "all 0.3s ease",
                filter: isGoalActive
                  ? "drop-shadow(0 0 8px rgba(34,197,94,0.8))"
                  : "none",
              }}
            >
              ⚽
            </div>
          </div>
        </div>

        {/* <p
          style={{
            marginTop: "clamp(12px, 3vw, 16px)",
            fontSize: "clamp(13px, 3vw, 15px)",
            color: isGoalActive ? "#22c55e" : "#6b7280",
            fontWeight: isGoalActive ? "700" : "500",
            transition: "all 0.3s ease",
          }}
        >
          {isGoalActive
            ? "🎯 PERFECT! Release to score!"
            : goalPosition === "center"
            ? `Drag to ${Math.round(progress)}% → Goal at 60-100%`
            : `Drag to ${Math.round(progress)}% → Goal at 85-100%`}
        </p> */}
      </div>

      <style>{`
        @keyframes goalPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(-15deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.35) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.85;
          }
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default CustomCaptcha;