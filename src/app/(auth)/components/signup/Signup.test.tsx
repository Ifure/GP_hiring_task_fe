import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SignUp from "./signup";
import { registerUser } from "@/api/authentication/api.auth";
import { toast } from "react-toastify";
import { useAuth } from "@/app/hooks/useAuth";

jest.mock("../../../../api/authentication/api.auth");
jest.mock("react-toastify");
jest.mock("../../../hooks/useAuth");

const mockedRegisterUser = registerUser as jest.Mock;
const mockedToastError = toast.error as jest.Mock;
const registerMock = jest.fn();

// Set up mock for `useAuth`
(useAuth as jest.Mock).mockReturnValue({ register: registerMock });

describe("SignUp component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields and submit button", () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("validates form fields and shows error messages", async () => {
    render(<SignUp />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("calls register function on successful registration", async () => {
    mockedRegisterUser.mockResolvedValueOnce("mockToken");

    render(<SignUp />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });
    expect(registerMock).toHaveBeenCalled();
  });

  test("displays error toast message when registration fails", async () => {
    mockedRegisterUser.mockResolvedValueOnce(null);

    render(<SignUp />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith("Something went wrong!");
    });
    expect(registerMock).not.toHaveBeenCalled();
  });
});
