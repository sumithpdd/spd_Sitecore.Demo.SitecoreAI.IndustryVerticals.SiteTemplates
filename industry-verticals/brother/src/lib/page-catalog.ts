/**
 * Hub / solution page copy for PageHeader, PageContent, LinkList fallbacks.
 */
export type BrotherPageContent = {
  path: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  bodyHtml: string;
  links?: { label: string; href: string }[];
};

export const BROTHER_PAGES: BrotherPageContent[] = [
  {
    path: '/labelling-and-receipts',
    eyebrow: 'Devices',
    title: 'Labelling and receipts',
    lead: 'Label printers and media for office, warehouse and craft — from QL desktop to VC-500W colour.',
    bodyHtml: `<p>Browse Brother labelling ranges for every workplace. Start with office labelling, explore full-colour VC-500W, or jump straight to store PDPs and genuine supplies.</p>`,
    links: [
      { label: 'Office labelling', href: '/labelling-and-receipts/office-labelling' },
      { label: 'VC-500W overview', href: '/labelling-and-receipts/vc-500w' },
      { label: 'QL-800 store', href: '/devices/label-printer/ql/ql-800' },
    ],
  },
  {
    path: '/labelling-and-receipts/office-labelling',
    eyebrow: 'Labelling · Office',
    title: 'Office labelling',
    lead: 'Desktop and handheld label printers that keep files, cables and visitor badges organised.',
    bodyHtml: `<p>Office labelling covers QL black &amp; red desktops, P-touch handhelds and colour VC-500W for badges and signage. Pair devices with DK and CZ media for a complete OrderCloud attach story.</p>`,
    links: [
      { label: 'QL-800', href: '/devices/label-printer/ql/ql-800' },
      { label: 'QL-820NWB', href: '/devices/label-printer/ql/ql-820nwb' },
      { label: 'VC-500W', href: '/labelling-and-receipts/vc-500w' },
      { label: 'Label supplies', href: '/supplies' },
    ],
  },
  {
    path: '/labelling-and-receipts/vc-500w',
    eyebrow: 'Labelling · Colour',
    title: 'VC-500W Full Colour Label Printer',
    lead: 'ZINK Zero Ink full-colour labels from PC, Mac, smartphone or tablet.',
    bodyHtml: `<p>Print crisp colour labels without cartridges. Five continuous widths, Wi‑Fi and a touchpad cutter make the VC-500W ideal for organisation, craft and light signage. Continue to the store PDP or CZ media.</p>`,
    links: [
      { label: 'Shop VC-500W', href: '/devices/label-printer/vc/vc500w' },
      { label: 'VC-500WCR store', href: '/devices/label-printer/vc/vc500wcr' },
      { label: 'CZ label rolls', href: '/supplies/label-printers/labels/cz/cz1003' },
      {
        label: 'Vertical applications',
        href: '/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
      },
    ],
  },
  {
    path: '/business-solutions',
    eyebrow: 'Business',
    title: 'Business solutions',
    lead: 'Managed print, labelling workflows and workgroup devices that keep teams productive.',
    bodyHtml: `<p>Brother business solutions combine devices, supplies and services. Explore Managed Print Service for fleet control, or jump into labelling and supplies commerce demos.</p>`,
    links: [
      { label: 'Managed Print Service', href: '/business-solutions/managed-print-service' },
      { label: 'MPS Essential', href: '/business-solutions/managed-print-service/mps-essential' },
      { label: 'Labelling', href: '/labelling-and-receipts' },
      { label: 'Supplies', href: '/supplies' },
    ],
  },
  {
    path: '/business-solutions/managed-print-service',
    eyebrow: 'Business · MPS',
    title: 'Managed Print Service',
    lead: 'Greater efficiency, productivity and mobility — with cost control and security built in.',
    bodyHtml: `<p>Managed Print Service (MPS) helps organisations right-size fleets, reduce waste and keep devices secure. Start with MPS Essential for growing offices, then attach genuine supplies through OrderCloud.</p>`,
    links: [
      { label: 'MPS Essential', href: '/business-solutions/managed-print-service/mps-essential' },
      { label: 'Browse printers', href: '/printers' },
      { label: 'Supplies reorder', href: '/supplies?utm_campaign=ordercloud-supplies' },
    ],
  },
  {
    path: '/business-solutions/managed-print-service/mps-essential',
    eyebrow: 'MPS · Essential',
    title: 'MPS Essential',
    lead: 'Right-sized managed print for growing offices — predictable costs and proactive support.',
    bodyHtml: `<p>MPS Essential covers core fleet visibility, toner replenishment and device health. Pair with Brother lasers and genuine TN supplies so Rick’s attach-rate demos stay measurable.</p>`,
    links: [
      { label: 'Back to MPS', href: '/business-solutions/managed-print-service' },
      { label: 'HL-L2460DN', href: '/devices/printers/hl/hl-l2460dn' },
      { label: 'OrderCloud checkout', href: '/checkout/supplies?utm_campaign=ordercloud-checkout' },
    ],
  },
];

export function findPageByPath(pathname: string): BrotherPageContent | undefined {
  const path = (pathname || '').split('?')[0].replace(/\/$/, '') || '/';
  return (
    BROTHER_PAGES.find((p) => p.path === path) ||
    BROTHER_PAGES.find((p) => path.startsWith(p.path) && p.path !== '/')
  );
}
