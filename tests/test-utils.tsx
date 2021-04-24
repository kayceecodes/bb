// test-utils.js
import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer, { initialState as reducerInitialState } from '../src/store/reducers/index'

import { ThemeProvider } from "@material-ui/styles";
import theme from "../src/ui/Theme";

/** from davidgilbertson @ https://github.com/testing-library/react-testing-library/issues/322 */
import { within, waitForElementToBeRemoved, Matcher, render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

/** from davidgilbertson @ https://github.com/testing-library/react-testing-library/issues/322 */
export const testMaterial = {
  selectOption: async (element: any, optionText: Matcher) =>
    new Promise((resolve) => {
      // The the button that opens the dropdown, which is a sibling of the input
      const selectButton = element.parentNode.querySelector("[role=button]");

      // Open the select dropdown
      UserEvent.click(selectButton);

      // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
      const listbox = document.body.querySelector("ul[role=listbox]");

      // Click the list item
      const listItem = within(listbox as HTMLElement).getByText(optionText);
      UserEvent.click(listItem);

      // Wait for the listbox to be removed, so it isn't visible in subsequent calls
      waitForElementToBeRemoved(() =>
        document.body.querySelector("ul[role=listbox]")
      ).then(resolve);
    }),
};

const thunk = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}

export const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = (action: any) => thunk(store)(next)(action)

  return { store, next, invoke }
}

const customRender = (
  ui: JSX.Element,
  { initialState = reducerInitialState,
    store = createStore(rootReducer), ...options } = {}
) =>

  render(ui, {
    wrapper: ({ children }: PropsWithChildren<{}>) => (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
              <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </ThemeProvider>
    ),
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
