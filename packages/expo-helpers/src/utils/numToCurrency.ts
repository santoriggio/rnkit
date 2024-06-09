import getLocale from "./getLocale";
import i18n from "./i18n";

function numToCurrency(amount: number | "****", currency: string): string {
  // if (amount === "****") return "";
  const locale = getLocale();
  if (locale === null || locale.currencyCode === null) {
    return "";
  }
  //FIX: Sistema questa constante per non create problemi
  const languageTag = i18n.locale;
  //
  const formatter = new Intl.NumberFormat(
    amount === "****" ? "en-US" : languageTag,
    {
      style: "currency",
      currency: currency || locale.currencyCode,
      minimumFractionDigits: 2,
    }
  );

  if (amount === "****") {
    const formatted = formatter.format(0);

    return formatted.replace("0.00", "****");
  }

  return formatter.format(amount);
}

export default numToCurrency;
