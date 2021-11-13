import { IconFlagTR, IconFlagDE, IconFlagUS } from "material-ui-flags";
import en from "../Localization/en.json";
import de from "../Localization/de.json";
import tr from "../Localization/tr.json";

export const resources = {
	en,
	de,
	tr
};

export const languages = {
	en: { nativeName: "English", icon: IconFlagUS },
	de: { nativeName: "Deutsch", icon: IconFlagDE },
	tr: { nativeName: "Turkce", icon: IconFlagTR },
};
