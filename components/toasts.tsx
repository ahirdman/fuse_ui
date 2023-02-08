import { Toast } from "react-hot-toast";
import {
  FiAlertTriangle,
  FiUserCheck,
  FiUserPlus,
  FiUserX,
} from "react-icons/fi";

interface ToastProps {
  toast: Toast;
  text: string;
}

export function SignedInToast({ toast, text }: ToastProps) {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-12 items-center rounded-2xl bg-black px-4 text-white shadow shadow-zinc-900`}
    >
      <span className="pr-3">
        <FiUserCheck size={20} className="stroke-orange" />
      </span>
      <p> {text}</p>
    </div>
  );
}

export function SignedOutToast({ toast, text }: ToastProps) {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-12 items-center rounded-2xl bg-black px-4 text-white shadow shadow-zinc-900`}
    >
      <span className="pr-3">
        <FiUserX size={20} className="stroke-orange" />
      </span>
      <p> {text}</p>
    </div>
  );
}

export function UserCreatedToast({ toast, text }: ToastProps) {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-12 items-center rounded-2xl bg-black px-4 text-white shadow shadow-zinc-900`}
    >
      <span className="pr-3">
        <FiUserPlus size={20} className="stroke-orange" />
      </span>
      <p> {text}</p>
    </div>
  );
}

export function ErrorToast({ toast, text }: ToastProps) {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-12 items-center rounded-2xl bg-black px-4 text-white shadow shadow-zinc-900`}
    >
      <span className="pr-3">
        <FiAlertTriangle size={25} className="stroke-orange" />
      </span>
      <p> {text}</p>
    </div>
  );
}
