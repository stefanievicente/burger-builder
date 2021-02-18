import reducer from "./auth";
import * as actions from "../actions/actions";

describe("auth reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
  });

  it("should return the inital state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store the token upon login", () => {
    expect(
      reducer(initialState, {
        type: actions.AUTH_SUCCESS,
        idToken: "some-token",
        userId: "some-id",
      })
    ).toEqual({
      token: "some-token",
      userId: "some-id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
