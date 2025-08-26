interface MockPlaceholderProps {
  className?: string;
}

export const MockPlaceholder = ({ className = '' }: MockPlaceholderProps) => {
  return (
    <div className="sc-jss-empty-placeholder">
      <div
        className={`bg-white/94 hover:bg-[#e9e7ff] border-2 border-[#969696] border-dashed p-5 flex items-center justify-center w-full h-25 min-w-12 cursor-pointer ${className}`}
      >
        <div className="size-10 bg-[#5548d9] rounded-full flex items-center justify-center">
          <span className="text-white text-3xl">+</span>
        </div>
      </div>
    </div>
  );
};

export const renderStorybookPlaceholder = () => {
  return {
    componentName: 'MockPlaceholder',
    dataSource: '',
    params: {},
    fields: {},
    placeholders: {},
  };
};
