interface InteractivePoint {
  x: number;
  y: number;
}

interface InteractiveOptions {
  onPointer: (point: InteractivePoint) => void;
  onKey: (event: KeyboardEvent) => void;
}

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

const getPoint = (element: HTMLElement, event: PointerEvent): InteractivePoint => {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.width === 0 ? 0 : clamp((event.clientX - rect.left) / rect.width),
    y: rect.height === 0 ? 0 : clamp((event.clientY - rect.top) / rect.height)
  };
};

export const bindInteractive = (element: HTMLElement, options: InteractiveOptions) => {
  let activePointerId: number | null = null;

  const handlePointerDown = (event: PointerEvent): void => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    activePointerId = event.pointerId;
    element.focus({ preventScroll: true });
    element.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    options.onPointer(getPoint(element, event));
  };

  const handlePointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== activePointerId) {
      return;
    }

    event.preventDefault();
    options.onPointer(getPoint(element, event));
  };

  const clearPointer = (event: PointerEvent): void => {
    if (event.pointerId !== activePointerId) {
      return;
    }

    activePointerId = null;
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    const relevantKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown"
    ];

    if (!relevantKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    options.onKey(event);
  };

  element.addEventListener("pointerdown", handlePointerDown);
  element.addEventListener("pointermove", handlePointerMove);
  element.addEventListener("pointerup", clearPointer);
  element.addEventListener("pointercancel", clearPointer);
  element.addEventListener("keydown", handleKeyDown);

  return () => {
    element.removeEventListener("pointerdown", handlePointerDown);
    element.removeEventListener("pointermove", handlePointerMove);
    element.removeEventListener("pointerup", clearPointer);
    element.removeEventListener("pointercancel", clearPointer);
    element.removeEventListener("keydown", handleKeyDown);
  };
};

