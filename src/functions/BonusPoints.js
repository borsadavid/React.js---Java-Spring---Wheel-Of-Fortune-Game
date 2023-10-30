export default function bonusPoints(answer, chosenLetters) {
  const notGuessedLetters = answer.split('').filter(letter => !chosenLetters.includes(letter));
  return notGuessedLetters.length * 5;
}
