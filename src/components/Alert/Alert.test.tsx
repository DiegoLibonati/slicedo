import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { GlobalState } from "../../entities/entities";

import { Alert } from "./Alert";

import { renderWithState } from "../../../tests/renders/renderWithState";
import { mockGlobalState } from "../../../tests/jest.constants";

describe("Alert.tsx", () => {
  describe("General Tests.", () => {
    const globalState: GlobalState = {
      ...mockGlobalState,
      alert: {
        type: "type",
        message: "message 2",
      },
    };

    test("It must render the alert with the state with content.", () => {
      renderWithState({
        globalState: globalState,
        children: <Alert></Alert>,
      });

      const message = screen.getByRole("heading", {
        name: globalState.alert.message,
      });
      const btnCloseAlert = screen.getByRole("button", {
        name: /close alert/i,
      });
      // eslint-disable-next-line
      const alertContainer = message.parentElement as HTMLDivElement;

      expect(message).toBeInTheDocument();
      expect(btnCloseAlert).toBeInTheDocument();
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass(`alert ${globalState.alert.type}`);
    });

    test("It must reset the alert status when you click the alert button.", async () => {
      renderWithState({
        globalState: globalState,
        children: <Alert></Alert>,
      });

      const message = screen.getByRole("heading", {
        name: globalState.alert.message,
      });
      const btnCloseAlert = screen.getByRole("button", {
        name: /close alert/i,
      });
      // eslint-disable-next-line
      const alertContainer = message.parentElement as HTMLDivElement;

      expect(message).toBeInTheDocument();
      expect(btnCloseAlert).toBeInTheDocument();
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass(`alert ${globalState.alert.type}`);

      await user.click(btnCloseAlert);

      expect(message).toBeEmptyDOMElement();
      expect(alertContainer).not.toHaveClass(`alert ${globalState.alert.type}`);
    });
  });
});
