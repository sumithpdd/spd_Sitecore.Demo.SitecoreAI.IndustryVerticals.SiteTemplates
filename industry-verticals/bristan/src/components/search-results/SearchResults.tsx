import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useRouter } from 'next/router';
import QuestionsAnswers from '../non-sitecore/search/QuestionsAnswers';
import SearchResultsWidget from '../non-sitecore/search/SearchResultsComponent';
import { SEARCH_WIDGET_ID } from '@/constants/search';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
};

export const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const router = useRouter();
  const sxaStyles = `${props.params?.styles || ''}`;
  const rawQuery = router.query.q ?? router.query.query;
  const query =
    typeof rawQuery === 'string' ? rawQuery : Array.isArray(rawQuery) ? (rawQuery[0] ?? '') : '';

  return (
    <div key={query} className={`${sxaStyles} w-full`}>
      <QuestionsAnswers
        key={`${query}-questions`}
        rfkId="rfkid_qa"
        defaultKeyphrase={query}
        defaultRelatedQuestions={3}
      />
      <SearchResultsWidget rfkId={SEARCH_WIDGET_ID} defaultKeyphrase={query} />
    </div>
  );
};

export const Default = SearchResults;
