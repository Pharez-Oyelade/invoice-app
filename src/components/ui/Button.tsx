import { Plus } from "lucide-react";

const BUTTON_VARIANTS = {
  primary:
    "bg-(--button-primary) text-white text-[15px] leading[-0.25] hover:bg-(--button-primary-hover) w-[150px] h-[48px] rounded-[24px] flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--button-primary)",
  secondary:
    "bg-(--button-primary) text-white text-[15px] hover:bg-(--button-primary-hover) w-[131px] h-[48px] rounded-[24px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--button-primary)",
  edit: "bg-(--button-secondary) text-(--text-primary) text-[15px] hover:bg-(--button-secondary-hover) w-[73px] px-10 h-[48px] rounded-[24px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--button-secondary)",
  delete:
    "bg-red-500 text-white hover:bg-red-600 w-[89px] text-[15px] h-[48px] rounded-[24px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500",
  form: "bg-[#F9FAFE] text-(--text-form) text-[15px] hover:bg-[#DFE3FA] w-full h-[48px] rounded-[24px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F9FAFE]",
  draft:
    "text-(--text-form) bg-(--button-draft) hover:bg-(--button-draft-hover) w-[133px] text-[15px] h-[48px] rounded-[24px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--button-draft)",
};

const Button = ({
  variant,
  text,
  onClick,
  disabled,
}: {
  variant: keyof typeof BUTTON_VARIANTS;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div>
      {/* <button className={BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary}>
      {variant}
    </button> */}
      {variant === "primary" && (
        <button
          className={BUTTON_VARIANTS.primary}
          onClick={onClick}
          disabled={disabled}
        >
          <div className="bg-white text-(--button-primary) w-[32px] h-[32px] rounded-full ml-[8px]">
            <Plus className="m-auto h-[20px] w-[20px] mt-[6px] " />
          </div>
          {text}
        </button>
      )}
      {variant !== "primary" && (
        <button
          className={BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
