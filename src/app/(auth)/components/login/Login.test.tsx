/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./Login";
import { loginUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";

jest.mock("../../../../api/authentication/api.auth");
jest.mock("../../../hooks/useAuth");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockedLoginUser = loginUser as jest.Mock;
const mockedUseAuth = useAuth as jest.Mock;

describe("LoginForm component", () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({ login: loginMock });
    jest.clearAllMocks();
  });

  test("renders email and password input fields", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("shows validation errors for empty fields", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("shows validation error for invalid email format", async () => {
    render(<LoginForm />);

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Enter a valid email address")
      ).toBeInTheDocument();
    });
  });

  test("calls loginUser API with correct data and handles login", async () => {
    const mockLoginData = { token: "sampleToken" };
    mockedLoginUser.mockResolvedValueOnce(mockLoginData);

    render(<LoginForm />);

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedLoginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
    expect(loginMock).toHaveBeenCalledWith(mockLoginData);
  });
});
