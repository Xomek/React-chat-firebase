import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const $api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});

export default $api;
