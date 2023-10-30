package game.backend.GameHistory.Sentence;

public enum RandomSentence {
    TEXT_1("Lorem ipsum dolor sit amet"),
    TEXT_2("Consectetur adipiscing elit"),
    TEXT_3("Ut enim ad minim veniam"),
    TEXT_4("Quis nostrud exercitation ullamco laboris"),
    TEXT_5("Duis aute irure dolor in reprehenderit");

    private final String text;

    RandomSentence(String text) {
        this.text = text;
    }

    public String getSentence() {
        return text;
    }
}
