import { ethers } from "ethers";
import { connectToMetaMask, IMetaMaskData } from "./wallet.service";

jest.mock("ethers", () => ({
  ethers: {
    BrowserProvider: jest.fn().mockImplementation(() => ({
      getBalance: jest.fn().mockResolvedValue("1000000000000000000"),
      getNetwork: jest.fn().mockResolvedValue({ chainId: 1, name: "mainnet" }),
    })),
    formatEther: jest.fn().mockReturnValue("1.0"),
  },
}));

describe("connectToMetaMask", () => {
  const mockEthereum = {
    request: jest.fn(),
  };

  beforeAll(() => {
    global.alert = jest.fn(); // Mock alert
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).ethereum = mockEthereum; // Set mockEthereum as window.ethereum
  });

  afterAll(() => {
    delete (window as any).ethereum; // Clean up global ethereum after tests
  });

  it("should return undefined and show an alert if MetaMask is not installed", async () => {
    delete (window as any).ethereum;

    const result = await connectToMetaMask();

    expect(result).toBeUndefined();
    expect(global.alert).toHaveBeenCalledWith("MetaMask is not installed");
  });

  it("should return MetaMask data when connected successfully", async () => {
    mockEthereum.request.mockResolvedValueOnce(["0xMockAddress"]);

    const result = await connectToMetaMask();

    const expectedData: IMetaMaskData = {
      address: "0xMockAddress",
      balance: "1.0",
      chainId: "1",
      network: "mainnet",
    };

    expect(mockEthereum.request).toHaveBeenCalledWith({
      method: "eth_requestAccounts",
    });
    expect(ethers.BrowserProvider).toHaveBeenCalledWith(mockEthereum);
    expect(result).toEqual(expectedData);
  });

  it("should handle errors and show an alert if connecting fails", async () => {
    const errorMessage = "User rejected connection";
    mockEthereum.request.mockRejectedValueOnce(new Error(errorMessage));

    const result = await connectToMetaMask();

    expect(result).toBeUndefined();
    expect(global.alert).toHaveBeenCalledWith(`Error connecting to MetaMask: ${errorMessage}`);
  });

  it("should alert 'MetaMask not installed' if ethereum is undefined", async () => {
    delete (window as any).ethereum;

    const result = await connectToMetaMask();

    expect(result).toBeUndefined();
    expect(global.alert).toHaveBeenCalledWith("MetaMask is not installed");
  });
});
