import { renderHook, render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth, AuthGuard } from "./useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("jwt-decode");

const mockRouterPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
const mockedJwtDecode = jwtDecode as jest.Mock;

// Test values
const mockToken = "mockToken";
const decodedToken = { exp: Date.now() / 1000 + 60 * 60 };

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  test("logs in user and navigates to dashboard", async () => {
    mockedJwtDecode.mockReturnValue(decodedToken);

    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(async () => {
      result.current.login(mockToken);
    });

    expect(localStorage.getItem("jwt")).toBe(mockToken);
    expect(result.current.user).toEqual(decodedToken);
    expect(toast.success).toHaveBeenCalledWith("Login Succeeded!");
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  test("logs out user and navigates to login", async () => {
    localStorage.setItem("jwt", mockToken);
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(async () => {
      result.current.logout();
    });

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(result.current.user).toBeNull();
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  test("register redirects to login", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(async () => {
      result.current.register();
    });

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  test("validates a valid token", () => {
    mockedJwtDecode.mockReturnValue(decodedToken);

    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    expect(result.current.validateToken(mockToken)).toEqual(decodedToken);
  });

  test("returns null for an expired token", () => {
    mockedJwtDecode.mockReturnValue({ exp: Date.now() / 1000 - 60 * 60 });

    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.validateToken(mockToken)).toBeNull();
  });
});

describe("AuthGuard", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it("should redirect to /login if user is not authenticated", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.setUser(null));

    render(
      <AuthProvider>
        <AuthGuard>Protected Content</AuthGuard>
      </AuthProvider>
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should render children if user is authenticated", () => {
    const token = "mockToken";
    localStorage.setItem("jwt", token);

    // Mocking jwtDecode to return a valid user object
    mockedJwtDecode.mockReturnValue({
      exp: Date.now() / 1000 + 60 * 60,
      name: "John Doe",
    });

    // Render the hook to set the user
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Setting the user in the Auth context
    act(() => result.current.setUser({ name: "John Doe" }));

    // Render AuthGuard to check if it correctly renders the children
    render(
      <AuthProvider>
        <AuthGuard>Protected Content</AuthGuard>
      </AuthProvider>
    );

    // Expect that the content is rendered and no redirects occurred
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
