import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  rightIcon,
  handleClick,
  btnType = 'button', // Default type is 'button'
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}> {title} </span>
      {rightIcon && (
        <div className='relative w-6 h-6 '>
          <Image
            src={rightIcon}
            alt={rightIcon}
            fill
            className='object-contain'
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
