import { LoremIpsum } from "lorem-ipsum";

export function loremIpsumGenerator() {

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 3,
      min: 1
    },
    wordsPerSentence: {
      max: 50,
      min: 4
    }
  });

  return lorem.generateSentences(1);
}