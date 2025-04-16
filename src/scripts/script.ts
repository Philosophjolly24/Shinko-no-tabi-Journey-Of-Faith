import verses from "./verses";

let verse;
let passage;

export function shuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const random: number = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}
// console.log(verses);
shuffle(verses);

const URL = `https://query.getbible.net/v2/web/${verses[0]}`;

try {
  const response = await fetch(URL);
  //   TODO: remove the result console log
  const result = await response.json();
  //   Get key value first
  const verseKey = Object.keys(result)[0];
  //   input key value
  passage = result[verseKey].ref;
  verse = result[verseKey].verses
    .map(
      (verse: { chapter: number; verse: number; text: string }) => verse.text
    )
    .join(" ");
  // console.log(verse);
  // console.log(passage);
} catch (error) {
  console.error(error);
}
const data: { verse: string; passage: [string] } = { verse, passage };

export default data;

export function referenceLink(passage: string) {
  return `https://www.biblegateway.com/passage/?search=${
    passage.replace(" ", "%20").split(":")[0]
  }%20&version=NIV`;
}
