import React from 'react';
import {
  LinkField,
  Link as ContentSdkLink,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

interface Fields {
  SocialTitle: Field<string>;
  FacebookLink: LinkField;
  YoutubeLink: LinkField;
  InstagramLink: LinkField;
  TwitterLink: LinkField;
  LinkedinLink: LinkField;
  PinterestLink: LinkField;
}

type SocialFollowProps = ComponentProps & {
  fields: Fields;
  params: { [key: string]: string };
};

export const Default = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { Icon: Facebook, field: props.fields.FacebookLink, key: 'facebook' },
    { Icon: Twitter, field: props.fields.TwitterLink, key: 'twitter' },
    { Icon: Instagram, field: props.fields.InstagramLink, key: 'instagram' },
    { Icon: Linkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
    { Icon: Youtube, field: props.fields.YoutubeLink, key: 'youtube' },
  ];

  return (
    <div className="flex space-x-4" id={id}>
      {socialLinks.map(({ Icon, field, key }) => (
        <ContentSdkLink field={field} key={key}>
          <Icon className="h-5 w-5 text-gray-400 hover:text-background cursor-pointer" />
        </ContentSdkLink>
      ))}
    </div>
  );
};
