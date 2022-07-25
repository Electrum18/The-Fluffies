import { useRouter } from "next/router";
import { useEffect } from "react";

import MetaLinks from "@/components/metaLinks";

import en from "@/locales/en/pages/404";
import ru from "@/locales/ru/pages/404";

export default function About() {
  const router = useRouter();

  const t = router.locale === "ru" ? ru : en;

  useEffect(() => {
    router.push(router.locale === "ru" ? "/ru" : "/");
  }, []);

  return (
    <>
      <MetaLinks t={t} />
    </>
  );
}
