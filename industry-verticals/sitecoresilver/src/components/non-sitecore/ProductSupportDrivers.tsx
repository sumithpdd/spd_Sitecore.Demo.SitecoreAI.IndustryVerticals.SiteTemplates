import { useI18n } from 'next-localization';
import { Download, HelpCircle, BookOpen } from 'lucide-react';

export const ProductSupportDrivers = () => {
  const { t } = useI18n();

  const supportLinks = [
    {
      id: 'drivers',
      title: t('drivers_downloads_label') || 'Drivers & Downloads',
      description:
        t('drivers_downloads_description') ||
        'Download the latest drivers and software for your device',
      icon: Download,
      href: '#',
    },
    {
      id: 'faqs',
      title: t('faqs_label') || 'FAQs',
      description:
        t('faqs_description') || 'Find answers to frequently asked questions about this product',
      icon: HelpCircle,
      href: '#',
    },
    {
      id: 'manuals',
      title: t('manuals_guides_label') || 'Manuals & Guides',
      description:
        t('manuals_guides_description') ||
        'Access user manuals, guides, and documentation for your device',
      icon: BookOpen,
      href: '#',
    },
  ];

  const supportCategories = [
    {
      title: t('setting_up_label') || 'Setting up your device',
      links: [
        {
          text: t('quick_start_guide_label') || 'Quick Start Guide',
          href: '#',
        },
        {
          text: t('installation_instructions_label') || 'Installation Instructions',
          href: '#',
        },
      ],
    },
    {
      title: t('troubleshooting_label') || 'Troubleshooting',
      links: [
        {
          text: t('common_issues_label') || 'Common Issues',
          href: '#',
        },
        {
          text: t('error_messages_label') || 'Error Messages',
          href: '#',
        },
      ],
    },
    {
      title: t('how_to_videos_label') || 'How-to videos',
      links: [
        {
          text: t('video_tutorials_label') || 'Video Tutorials',
          href: '#',
        },
        {
          text: t('product_demos_label') || 'Product Demos',
          href: '#',
        },
      ],
    },
    {
      title: t('supplies_accessories_label') || 'Supplies and accessories',
      links: [
        {
          text: t('compatible_supplies_label') || 'Compatible Supplies',
          href: '#',
        },
        {
          text: t('accessories_label') || 'Accessories',
          href: '#',
        },
      ],
    },
    {
      title: t('product_warranty_label') || 'Product warranty',
      links: [
        {
          text: t('warranty_information_label') || 'Warranty Information',
          href: '#',
        },
        {
          text: t('register_product_label') || 'Register Product',
          href: '#',
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Main support cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {supportLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              className="group relative overflow-hidden rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
            >
              <div className="relative z-10">
                <Icon className="mb-4 size-12 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Support categories */}
      <div className="space-y-6">
        {supportCategories.map((category, index) => (
          <div key={index}>
            <h4 className="mb-3 text-lg font-semibold">{category.title}</h4>
            <ul className="space-y-2">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
