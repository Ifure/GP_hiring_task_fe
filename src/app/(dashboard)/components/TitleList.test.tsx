import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TitleList from "./TitleList";
import { useTitleContext } from "../../../contexts/TitleContextProvider";
import "@testing-library/jest-dom";

jest.mock("../../../contexts/TitleContextProvider");
jest.mock("react-toastify", () => ({
  toast: { info: jest.fn() },
}));

describe("TitleList Component", () => {
  const mockAddToTitles = jest.fn();
  const mockDeleteTitle = jest.fn();
  const mockHandleMetaMaskConnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTitleContext as jest.Mock).mockReturnValue({
      titles: [
        {
          title: "Sample Title 1",
          uuid: "1",
          createdAt: "2024-10-31T00:00:00Z",
        },
        {
          title: "Sample Title 2",
          uuid: "2",
          createdAt: "2024-11-01T00:00:00Z",
        },
      ],
      addToTitles: mockAddToTitles,
      deleteTitle: mockDeleteTitle,
      handleMetaMaskConnect: mockHandleMetaMaskConnect,
      walletConnected: false,
    });
  });

  it("renders 'Connect to Metamask' button when wallet is not connected", () => {
    render(<TitleList />);
    expect(screen.getByText("Connect to Metamask")).toBeInTheDocument();
  });

  it("calls handleMetaMaskConnect when 'Connect to Metamask' button is clicked", () => {
    render(<TitleList />);
    const connectButton = screen.getByText("Connect to Metamask");
    fireEvent.click(connectButton);
    expect(mockHandleMetaMaskConnect).toHaveBeenCalledTimes(1);
  });

  it("adds a new title when 'Add Title' button is clicked", async () => {
    render(<TitleList />);
    const input = screen.getByPlaceholderText("Add title");
    const addButton = screen.getByText("Add Title");

    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: "New Title" } });

    // Wait for button click and form submission
    fireEvent.click(addButton);

    // Assert `mockAddToTitles` was called with the correct value
    await waitFor(() => {
      expect(mockAddToTitles).toHaveBeenCalledWith("New Title");
    });
  });

  it("displays titles from context", () => {
    render(<TitleList />);

    const title1 = screen.getByText("Sample Title 1");
    const title2 = screen.getByText("Sample Title 2");

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });

  it("deletes a title when delete button is clicked", () => {
    render(<TitleList />);

    const deleteButtons = screen.getAllByRole("button", { name: "" });
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteTitle).toHaveBeenCalledWith("1");
  });
});
