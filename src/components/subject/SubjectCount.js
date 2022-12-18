import React from 'react'
import { useGetQuestionsCountQuery } from '../../store/questionApi'

export default function SubjectCount({subject_id}) {
  const { data } = useGetQuestionsCountQuery(subject_id);
  if (data) return <>{data.count}</>;
}
