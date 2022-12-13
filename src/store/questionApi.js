import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionApi = createApi({
  reducerPath: "questionApi",
  tagTypes: ["questions"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    fetchQuestion: build.query({
      query: () => ({
        url: "questions",
        method: "GET",
      }),
      providesTags: (result) => ["questions"],
    }),
    getOneQuestion: build.query({
      query: (id) => ({
        url: `questions/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["questions"],
    }),
    addQuestion: build.mutation({
      query: (obj) => ({
        url: "questions",
        method: "POST",
        body: {
          question: obj.question,
          subject: obj.subject,
          variants: [...obj.variants],
          class: obj.class,
          answer: obj.answer,
        },
      }),
      invalidatesTags: ["questions"],
    }),
    deleteQuestion: build.mutation({
      query: (id) => ({
        url: `questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),
    updateQuestion: build.mutation({
      query: (obj) => ({
        url: "questions",
        method: "PUT",
        body: {
          _id: obj._id,
          question: obj.question,
          subject: obj.subject,
          variants: obj.variants,
          class: obj.class,
          answer: obj.answer,
        },
      }),
      invalidatesTags: ["questions"],
    }),
  }),
});

export const {
  useFetchQuestionQuery,
  useGetOneQuestionQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = questionApi;
