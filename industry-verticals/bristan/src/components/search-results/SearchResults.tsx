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
  const q = router.query.q;
  const query = typeof q === 'string' ? q : Array.isArray(q) ? (q[0] ?? '') : '';

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
