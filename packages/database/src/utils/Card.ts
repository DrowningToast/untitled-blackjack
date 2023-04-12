import z from "zod";

export const ZodCard = z.object({
  display: z.string().min(1),
  values: z.array(z.number().min(0)),
});

export type Card = z.infer<typeof ZodCard>;

const aceCard: Card = {
  display: "A",
  values: [1, 11],
};

const twoCard: Card = {
  display: "2",
  values: [2],
};

const threeCard: Card = {
  display: "3",
  values: [3],
};

const fourCard: Card = {
  display: "4",
  values: [4],
};

const fiveCard: Card = {
  display: "5",
  values: [5],
};

const sixCard: Card = {
  display: "6",
  values: [6],
};

const sevenCard: Card = {
  display: "7",
  values: [7],
};

const eightCard: Card = {
  display: "8",
  values: [8],
};

const nineCard: Card = {
  display: "9",
  values: [9],
};

const tenCard: Card = {
  display: "10",
  values: [10],
};

const jackCard: Card = {
  display: "J",
  values: [10],
};

const queenCard: Card = {
  display: "Q",
  values: [10],
};

const kingCard: Card = {
  display: "K",
  values: [10],
};

const sortedAllCards: Card[] = [
  aceCard,
  twoCard,
  threeCard,
  fourCard,
  fiveCard,
  sixCard,
  sevenCard,
  eightCard,
  nineCard,
  tenCard,
  jackCard,
  queenCard,
  kingCard,
];

export {
  aceCard,
  twoCard,
  threeCard,
  fourCard,
  fiveCard,
  sixCard,
  sevenCard,
  eightCard,
  nineCard,
  tenCard,
  jackCard,
  queenCard,
  kingCard,
  sortedAllCards,
};
