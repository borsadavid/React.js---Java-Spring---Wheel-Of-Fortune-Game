package game.backend.GameHistory.Sentence;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;

@RestController
@RequestMapping( path = "api/random-sentence")
@CrossOrigin("*")
public class SentenceController {

    @GetMapping
    public String getRandomSentence(){
        Random random = new Random();
        RandomSentence[] values = RandomSentence.values();
        int randomIndex = random.nextInt(values.length);
        return values[randomIndex].getSentence();
    }

}
