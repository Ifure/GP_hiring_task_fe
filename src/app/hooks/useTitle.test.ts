import { renderHook, act, waitFor } from "@testing-library/react";
import { useTitle } from "./useTitle";
import { getTitles, addTitle } from "@/api/title/api.title";
import { connectToMetaMask } from "@/services/wallet.service";
import { toast } from "react-toastify";

// Mock API and Service Functions
jest.mock("../../api/title/api.title", () => ({
  getTitles: jest.fn(),
  addTitle: jest.fn(),
}));

jest.mock("../../services/wallet.service", () => ({
  connectToMetaMask: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("useTitle Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should fetch titles and filter out deleted ones on mount", async () => {
    // Mock response for getTitles
    const titlesMock = [
      { uuid: "1", title: "Test Title 1", createdAt: new Date() },
      { uuid: "2", title: "Test Title 2", createdAt: new Date() },
    ];

    (getTitles as jest.Mock).mockResolvedValue(titlesMock);

    // Set deleted titles in local storage
    localStorage.setItem("deletedTitles", JSON.stringify(["1"]));

    // Render the hook
    const { result } = renderHook(() => useTitle());

    // Wait for the effect to complete
    await waitFor(() => {
      expect(getTitles).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.titles).toEqual([
        { uuid: "2", title: "Test Title 2", createdAt: expect.any(Date) },
      ]);
    });
  });

  it("should connect to MetaMask and set wallet information", async () => {
    const walletData = { address: "0x123", balance: "10 ETH" };
    (connectToMetaMask as jest.Mock).mockResolvedValue(walletData);

    const { result } = renderHook(() => useTitle());
    await act(async () => {
      await result.current.handleMetaMaskConnect();
    });

    expect(connectToMetaMask).toHaveBeenCalled();
    expect(result.current.walletAddress).toBe(walletData.address);
    expect(result.current.accountBalance).toBe(walletData.balance);
    expect(result.current.walletConnected).toBe(true);
    expect(localStorage.getItem("walletAddress")).toBe(walletData.address);
    expect(localStorage.getItem("balance")).toBe(walletData.balance);
    expect(localStorage.getItem("walletConnected")).toBe("true");
  });

  it("should show error toast if MetaMask is not connected and addToTitles is called", async () => {
    const { result } = renderHook(() => useTitle());

    await act(async () => {
      await result.current.addToTitles("New Title");
    });

    expect(toast.error).toHaveBeenCalledWith("Please connect MetaMask");
    expect(addTitle).not.toHaveBeenCalled();
  });

  it("should add a new title if MetaMask is connected", async () => {
    // Mock the initial response of getTitles to be an empty array
    (getTitles as jest.Mock).mockResolvedValue([]);

    // Mock MetaMask connection response
    const mockWalletData = { address: "0x123", balance: "100" };
    (connectToMetaMask as jest.Mock).mockResolvedValue(mockWalletData);

    // Mock response for addTitle
    const newTitleResponse = {
      title: "New Title",
      createdAt: new Date(),
      uuid: "3",
    };
    (addTitle as jest.Mock).mockResolvedValue(newTitleResponse);

    // Render the hook
    const { result } = renderHook(() => useTitle());

    // Connect MetaMask
    await act(async () => {
      await result.current.handleMetaMaskConnect();
    });

    // Add a new title
    await act(async () => {
      await result.current.addToTitles("New Title");
    });

    // Assertions
    expect(connectToMetaMask).toHaveBeenCalled();
    expect(addTitle).toHaveBeenCalledWith({ title: "New Title" });

    // Verify that the title has been added to the titles state
    await waitFor(() => {
      expect(result.current.titles).toEqual([
        { title: "New Title", createdAt: expect.any(Date), uuid: "3" },
      ]);
    });
  });

  it("should delete a title and show a success toast", async () => {
    // Mock the initial response of getTitles with some titles
    const titlesMock = [
      { uuid: "1", title: "Test Title 1", createdAt: new Date() },
      { uuid: "2", title: "Test Title 2", createdAt: new Date() },
    ];
    (getTitles as jest.Mock).mockResolvedValue(titlesMock);

    // Mock MetaMask connection response
    const mockWalletData = { address: "0x123", balance: "100" };
    (connectToMetaMask as jest.Mock).mockResolvedValue(mockWalletData);

    // Render the hook
    const { result } = renderHook(() => useTitle());

    // Connect MetaMask
    await act(async () => {
      await result.current.handleMetaMaskConnect();
    });

    // Delete the title with UUID "1"
    await act(async () => {
      result.current.deleteTitle("1");
    });

    // Assertions
    expect(result.current.titles).not.toContainEqual(titlesMock[0]); // Ensure the title is removed

    // Check localStorage for deleted titles
    const deletedTitles = JSON.parse(
      localStorage.getItem("deletedTitles") || "[]"
    );
    expect(deletedTitles).toContain("1"); // Ensure the deleted title ID is in localStorage

    // Check that the success toast was called
    expect(toast.success).toHaveBeenCalledWith("Title deleted successfully");
  });

  it("should show error toast when deleting a title without MetaMask connection", () => {
    const { result } = renderHook(() => useTitle());

    act(() => {
      result.current.deleteTitle("1");
    });

    expect(toast.error).toHaveBeenCalledWith("Please connect to MetaMask");
    expect(result.current.titles).toEqual([]);
  });
});
