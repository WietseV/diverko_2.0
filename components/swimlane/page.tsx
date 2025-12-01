import { Children, ReactNode, type CSSProperties } from "react";

type SwimlaneProps = {
  children: ReactNode;
  className?: string;
};

export default function Swimlane({ children, className }: SwimlaneProps) {
  const lanePadding = "calc((100vw - min(100vw, 64rem))/2 + 1.5rem)";

  return (
    <div
      className={`relative left-1/2 right-1/2 w-screen -translate-x-1/2 lg:left-0 lg:right-0 lg:w-full lg:translate-x-0 ${className ?? ""}`}
      style={{ ["--lane-pad" as string]: lanePadding } as CSSProperties}
    >
      <div
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        pl-[var(--lane-pad)] pr-[var(--lane-pad)] lg:pl-0 lg:pr-0
        lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:snap-none"
        style={{
          scrollPaddingLeft: lanePadding,
          scrollPaddingRight: lanePadding,
        }}
      >
        {Children.map(children, (child, index) => (
          <div
            key={index}
            className="snap-start shrink-0 w-[264px] min-w-[264px] max-w-[264px] lg:w-auto lg:min-w-0 lg:max-w-none"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
