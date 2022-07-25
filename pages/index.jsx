import Dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import shallow from "zustand/shallow";

import LeftBar from "@/components/editor/left-bar";
import RightBar from "@/components/editor/right-bar";
import Modal from "@/components/elements/modal";
import Loading from "@/components/loading";
import MetaLinks from "@/components/metaLinks";

import useMenu from "@/helpers/menu";

import { useLocalStorageControl } from "@/hooks/controls";
import useUserFetch from "@/hooks/user";

import en from "@/locales/en/pages/editor";
import ru from "@/locales/ru/pages/editor";

import styles from "@/styles/editor.module.css";

const selector = (state) => [state.page, state.closePages];

const Canvas = Dynamic(() => import("@/components/editor/world"), {
  ssr: false,
  loading: Loading,
});

export default function () {
  const router = useRouter();

  const [page, closePages] = useMenu(selector, shallow);

  const t = router.locale === "ru" ? ru : en;

  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
  }, []);

  useLocalStorageControl();
  useUserFetch();

  return (
    <>
      <MetaLinks t={t} />

      <main>
        {page === "Welcome" && (
          <Modal
            className={styles.titleModal}
            title="Добро пожаловать!"
            page="Welcome"
          >
            <header>
              <h1 className="brand-gradient"> The Fluffies Studio </h1>
            </header>

            <section>
              <h2>{t.title}</h2>

              {t.text.map((content, index) => (
                <p key={index}>{content}</p>
              ))}

              <button className="button button-white" onClick={closePages}>
                {t.button}
              </button>
            </section>
          </Modal>
        )}

        <Canvas />
        <LeftBar />
        <RightBar />
      </main>
    </>
  );
}
