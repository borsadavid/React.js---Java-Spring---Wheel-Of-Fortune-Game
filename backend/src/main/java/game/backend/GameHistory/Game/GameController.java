package game.backend.GameHistory.Game;


import game.backend.GameHistory.Player.Player;
import game.backend.user.ApplicationUser;
import game.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "api")
@CrossOrigin("*")
public class GameController {


    private final GameService gameService;
    private final UserRepository userRepository;

    @Autowired
    public GameController(GameService gameService, UserRepository userRepository) {
        this.gameService = gameService;
        this.userRepository = userRepository;
    }

    @GetMapping(path = "/game")
    public List<Game> getGames(){
        Integer userId = getLoggedInUserId();
        return gameService.getGames(userId);
    }

    @PostMapping(path = "/create-game")
    public Long postGame(@RequestBody List<String> playerNames){
        List<Player> players = playerNames.stream().map(name -> new Player(name)).toList();

        Game game = new Game();
        game.setPlayers(players);
        game.setUserId(getLoggedInUserId());

        return gameService.postGame(game);
    }

    @PatchMapping("/update-score/{gameId}")
    public void updatePlayersScore(
            @PathVariable Long gameId,
            @RequestBody Map<String, Integer> playersScore
    ){
        gameService.updatePlayersScore(gameId, playersScore);
    }

    @DeleteMapping(path = "/delete-games")
    public void deleteAllGames(){
        gameService.deleteAllGames();
    }


    private int getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<ApplicationUser> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            ApplicationUser user = optionalUser.get();
            return user.getUserId();
        } else {
            throw new RuntimeException("User not found");
        }
    }


}
