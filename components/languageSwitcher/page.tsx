import { getLanguage } from "@/lib/language";
import LanguageSwitcherClient from "./LanguageSwitcherClient";

type Props = {
  className?: string;
  variant?: "inline" | "pill";
};

export default async function LanguageSwitcher(props: Props) {
  const current = await getLanguage();
  return <LanguageSwitcherClient current={current} {...props} />;
}
