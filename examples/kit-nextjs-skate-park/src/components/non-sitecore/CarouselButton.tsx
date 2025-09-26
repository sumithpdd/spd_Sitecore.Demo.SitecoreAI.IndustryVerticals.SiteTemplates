import ShortArrow from '@/assets/icons/arrow-short/ArrowShort';

interface CarouselButtonProps {
  direction?: 'prev' | 'next';
  className?: string;
}

const CarouselButton = ({ direction = 'next', className = '' }: CarouselButtonProps) => {
  return (
    <button
      className={`!text-foreground bg-background z-10 size-12 content-center rounded-full shadow-md ${className}`}
    >
      <ShortArrow className={direction === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
};

export default CarouselButton;
