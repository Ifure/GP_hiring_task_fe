import { render, screen, fireEvent, within } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useTitleContext } from "../../../contexts/TitleContextProvider";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";

jest.mock("../../hooks/useAuth");
jest.mock("../../../contexts/TitleContextProvider");
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

describe("Sidebar Component", () => {
  const mockLogout = jest.fn();
  const mockHandleMetaMaskConnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useTitleContext as jest.Mock).mockReturnValue({
      handleMetaMaskConnect: mockHandleMetaMaskConnect,
      walletConnected: false,
      walletAddress: null,
      balance: null,
    });
  });

  it("renders the Sidebar component correctly", () => {
    render(<Sidebar />);
    expect(screen.getByText("Balance")).toBeInTheDocument();
    expect(screen.getByText("Wallet Address")).toBeInTheDocument();
    expect(screen.getByText("Connect to Metamask")).toBeInTheDocument();
  });

  it("connects to MetaMask when the 'Connect to Metamask' button is clicked", () => {
    render(<Sidebar />);
    const connectButton = screen.getByText("Connect to Metamask");
    fireEvent.click(connectButton);

    expect(mockHandleMetaMaskConnect).toHaveBeenCalledTimes(1);
  });

  it("copies wallet address to clipboard and shows toast message", async () => {
    (useTitleContext as jest.Mock).mockReturnValue({
      handleMetaMaskConnect: mockHandleMetaMaskConnect,
      walletConnected: true,
      walletAddress: "0x1234567890abcdef",
      balance: "100.00",
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
        readText: jest.fn().mockResolvedValue("0x1234567890abcdef"),
      },
    });

    render(<Sidebar />);
    const copyButton = screen.getByRole("button", { name: /copy icon/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("0x1234567890abcdef");
    expect(toast.success).toHaveBeenCalledWith("Copied!");
  });

  it("shows local storage wallet data if available", () => {
    localStorage.setItem("walletAddress", "0xStoredAddress");
    localStorage.setItem("balance", "500.00");
    localStorage.setItem("walletConnected", "true");

    render(<Sidebar />);

    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByText("0xStoredAddress")).toBeInTheDocument();
  });

  it("calls logout when 'LOGOUT' button is clicked", () => {
    render(<Sidebar />);

    // Select the div that holds the button first
    const logoutDiv = screen.getByTestId("logout-div");

    const logoutButton = within(logoutDiv).getByRole("button", { name: /logout/i });

    if (logoutButton) {
      fireEvent.click(logoutButton); // Click the button

      // Check that the logout function was called
      expect(mockLogout).toHaveBeenCalledTimes(1);
    } else {
      throw new Error("Logout button not found");
    }
  });
});
