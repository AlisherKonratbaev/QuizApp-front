import React from 'react'
import QuestionAddForm from "../components/question/QuestionAddForm";
import QuestionsList from '../components/question/QuestionsList';

export default function Questions() {
  return (
    <>
      <QuestionAddForm />
      <QuestionsList />
    </>
  )
}
