import { ArrowLong } from '@/assets/icons/arrow-long/arrow-long';
import { Link, LinkField } from '@sitecore-content-sdk/nextjs';

interface ButtonProps {
  linkText: LinkField;
}

export const ExploreLink = (props: ButtonProps) => {
  return (
    <div className="text-md inline-flex w-fit flex-col">
      <div className="border-b-accent text-accent inline-flex items-center justify-start gap-3.5 border-b-[1px] leading-8">
        <Link field={props.linkText} />
        <ArrowLong />
      </div>
    </div>
  );
};
