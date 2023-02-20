import { motion, Variants } from "framer-motion";

interface SuccessTextProps {
  type: string;
  variants: Variants | undefined;
}

export function SuccessText({ type, variants }: SuccessTextProps) {
  return (
    <motion.p
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, delay: 1 }}
      variants={variants}
      className="whitespace-nowrap pl-4 text-white"
    >
      <span className="font-bold uppercase text-orange">{type}</span> connected
    </motion.p>
  );
}
