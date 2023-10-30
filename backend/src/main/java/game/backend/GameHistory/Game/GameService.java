package game.backend.GameHistory.Game;

import game.backend.GameHistory.Player.Player;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GameService {

    private final GameRepository gameRepository;

    private final Logger logger = LoggerFactory.getLogger(GameService.class);

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getGames(Integer userId){
        return gameRepository.findAllByUserId(userId);
    }

    public Long postGame(Game game){
        Game savedGame = gameRepository.save(game);
        return savedGame.getId();
    }

    @Transactional
    public void updatePlayersScore(Long gameId, Map<String, Integer> playersScore){
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        String winner = "";
        int highestScore = 0;
        if (gameOptional.isPresent()){
            logger.debug("Game with ID {} found.", gameId);
            Game game = gameOptional.get();
            List<Player> players = game.getPlayers();

            for (Player player : players)
            {
                String playerName = player.getName();
                Integer newScore = playersScore.get(playerName);

                if ( newScore != null ) {
                    player.setScore(newScore);

                    if (newScore > highestScore) {
                        highestScore = newScore;
                        winner = player.getName();
                    }
                    else if (newScore == highestScore) {
                        winner = "Draw";
                    }
                }
            }
            game.setWinner(winner);
            gameRepository.save(game);
        }
        else {
            logger.debug("Game with ID {} not found.", gameId);
        }
    }

    public void deleteAllGames(){
        gameRepository.deleteAll();
    }

}
