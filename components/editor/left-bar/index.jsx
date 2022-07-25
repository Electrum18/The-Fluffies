import useMenu from "@/helpers/menu";
import styles from "@/styles/editor.module.css";

import Accounts from "./additional/accounts";
import Notice from "./additional/notice";
import Rules from "./additional/rules";
import EmotionsSection from "./emotions";
import EnvSection from "./environment";
import LanguageSection from "./language";
import SavePersonSection from "./savePersons";
import SocialSection from "./socials";
import TakeImageSection from "./takeImage";

const selector = (state) => state.page;

function Spacer() {
  return <div />;
}

export default function Menu() {
  const page = useMenu(selector);

  return (
    <div>
      <ul className={styles.leftBar}>
        <EmotionsSection />
        <EnvSection />
        <hr />
        <TakeImageSection />
        <SavePersonSection />
        <hr />
        <Spacer />
        <LanguageSection />
        <hr />
        <SocialSection />
      </ul>

      {page === "Accounts" && <Accounts />}
      {page === "Notice" && <Notice />}
      {page === "Rules" && <Rules />}
    </div>
  );
}
