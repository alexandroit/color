export const resolveElement = (input: string | HTMLElement): HTMLElement => {
  if (typeof input === "string") {
    const element = document.querySelector<HTMLElement>(input);

    if (!element) {
      throw new TypeError(`Could not find element for selector: ${input}`);
    }

    return element;
  }

  if (!(input instanceof HTMLElement)) {
    throw new TypeError("Expected a selector string or an HTMLElement");
  }

  return input;
};

