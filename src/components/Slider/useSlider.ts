import { DefaultOrientation } from "@/types/common";
import { ValueLabelDisplay } from "@/types/slider";
import assert from "@/utils/assert";
import { useEffect, useMemo, useRef, useState } from "react";

type UseSliderParameters = {
  orientation: DefaultOrientation;
  min: number;
  max: number;
  step: number;
  valueLabelDisplay: ValueLabelDisplay;
};

const useSlider = ({ orientation, min, max, step, valueLabelDisplay }: UseSliderParameters) => {
  const marks = useMemo(() => {
    const marks = [];

    for (let value = min; value <= max; value += step) {
      marks.push(value);
    }

    return marks;
  }, []);

  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const filledTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = () => {
      setDragging(true);
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    setMounted(true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const moveThumb = (thumbRef: HTMLElement, value: number) => {
    assert(containerRef.current !== null && filledTrackRef.current !== null);

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = orientation === "horizontal" ? containerRect.width : containerRect.height;
    const widthPerMark = (containerSize / (max - min)) * step;
    const offset = ((value - min) * widthPerMark) / step;

    if (orientation === "horizontal") {
      thumbRef.style.left = `${offset}px`;
    } else {
      thumbRef.style.bottom = `${offset}px`;
    }
  };

  const showValueLabel = (valueLabelRef: HTMLElement) => {
    if (valueLabelDisplay === "auto") {
      valueLabelRef.style.transform =
        orientation === "horizontal" ? "translate(0%, -100%) scale(1)" : "scale(1)";
    }
  };

  const hideValueLabel = (valueLabelRef: HTMLElement) => {
    if (valueLabelDisplay === "auto") {
      valueLabelRef.style.transform =
        orientation === "horizontal" ? "translate(0%, -100%) scale(0)" : "scale(0)";
    }
  };

  return {
    marks,
    dragging,
    mounted,
    containerRef,
    filledTrackRef,
    moveThumb,
    showValueLabel,
    hideValueLabel,
  };
};

export default useSlider;
