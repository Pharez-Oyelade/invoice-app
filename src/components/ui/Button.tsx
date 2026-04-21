import { Plus } from "lucide-react";

const BUTTON_VARIANTS = {
  primary:
    "bg-(--button-primary) text-white text-[15px] leading[-0.25] hover:bg-(--button-primary-hover) w-[150px] h-[48px] rounded-[24px] flex items-center gap-2 cursor-pointer",
  secondary:
    "bg-(--button-primary) text-white text-[15px] hover:bg-(--button-primary-hover) w-[131px] h-[48px] rounded-[24px] flex items-center justify-center",
  edit: "bg-(--button-secondary) text-(--text-primary) text-[15px] hover:bg-(--button-secondary-hover) w-[73px] h-[48px] rounded-[24px] flex items-center justify-center",
  delete:
    "bg-red-500 text-white hover:bg-red-600 w-[89px] text-[15px] h-[48px] rounded-[24px] flex items-center justify-center",
};

const Button = ({
  variant,
  text,
}: {
  variant: keyof typeof BUTTON_VARIANTS;
  text: string;
}) => {
  return (
    <div>
      {/* <button className={BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary}>
      {variant}
    </button> */}
      {variant === "primary" && (
        <button className={BUTTON_VARIANTS.primary}>
          <div className="bg-white text-(--button-primary) w-[32px] h-[32px] rounded-full ml-[8px]">
            <Plus className="m-auto h-[20px] w-[20px] mt-[6px] " />
          </div>
          {text}
        </button>
      )}
      {variant !== "primary" && (
        <button className={BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
