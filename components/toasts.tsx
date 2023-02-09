import { Toast } from "react-hot-toast";
import {
  FiAlertTriangle,
  FiUserCheck,
  FiUserPlus,
  FiUserX,
} from "react-icons/fi";

interface ExtendedToastProps {
  toast: Toast;
  text: string;
}

export function SignedInToast({ toast, text }: ExtendedToastProps) {
  return (
    <CustomToast toast={toast} text={text}>
      <FiUserCheck size={20} className="stroke-orange" />
    </CustomToast>
  );
}

export function SignedOutToast({ toast, text }: ExtendedToastProps) {
  return (
    <CustomToast toast={toast} text={text}>
      <FiUserX size={20} className="stroke-orange" />
    </CustomToast>
  );
}

export function UserCreatedToast({ toast, text }: ExtendedToastProps) {
  return (
    <CustomToast toast={toast} text={text}>
      <FiUserPlus size={20} className="stroke-orange" />
    </CustomToast>
  );
}

export function ErrorToast({ toast, text }: ExtendedToastProps) {
  return (
    <CustomToast toast={toast} text={text}>
      <FiAlertTriangle size={25} className="stroke-red" />
    </CustomToast>
  );
}

interface BaseToastProps {
  children: React.ReactNode;
  toast: Toast;
  text: string;
}

function CustomToast({ children, toast, text }: BaseToastProps) {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex items-center rounded-2xl bg-black py-3 px-4 text-white shadow shadow-zinc-900`}
    >
      <span className="pr-3">{children}</span>
      <p className={`${text.length > 30 ? "text-sm" : "text-base"}`}>{text}</p>
    </div>
  );
}
