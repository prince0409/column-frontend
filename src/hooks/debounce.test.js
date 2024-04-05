import debounce from "./debounce";

jest.useFakeTimers();

describe("debounce", () => {
  test("calls the function after specified delay", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    // Call the debounced function
    debouncedFunc();

    // Fast-forward time by 100 milliseconds
    jest.advanceTimersByTime(100);

    // Expect the function to have been called
    expect(func).toHaveBeenCalled();
  });

  test("does not call the function before delay has elapsed", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    // Call the debounced function
    debouncedFunc();

    // Fast-forward time by only 50 milliseconds
    jest.advanceTimersByTime(50);

    // Function should not have been called yet
    expect(func).not.toHaveBeenCalled();

    // Call the debounced function again
    debouncedFunc();

    // Fast-forward time by another 50 milliseconds (total 100 milliseconds)
    jest.advanceTimersByTime(100);

    // Expect the function to have been called now
    expect(func).toHaveBeenCalled();
  });
});
