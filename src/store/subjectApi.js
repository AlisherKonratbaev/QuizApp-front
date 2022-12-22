import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  tagTypes: ["subjects"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    fetchSubject: build.query({
      query: () => ({
        url: "subjects",
        method: "GET",
      }),
      providesTags: (result) => ["subjects"],
    }),
    getOneSubject: build.query({
      query: (id) => ({
        url: `subjects/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["subjects"],
    }),
    addSubject: build.mutation({
      query: (subject) => ({
        url: "subjects",
        method: "POST",
        body: {
          name: subject,
        },
      }),
      invalidatesTags: ["subjects"],
    }),
    deleteSubject: build.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subjects"],
    }),
    updateSubject: build.mutation({
      query: (subject) => ({
        url: "subjects",
        method: "PUT",
        body: {
          _id: subject._id,
          name:subject.name,
        },
      }),
      invalidatesTags: ["subjects"],
    }),
  }),
});

export const {
  useFetchSubjectQuery,
  useGetOneSubjectQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation
} = subjectApi;
