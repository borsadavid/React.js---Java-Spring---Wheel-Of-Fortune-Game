package game.backend.GameHistory.Player;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/player")
@CrossOrigin("*")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(){
        return playerService.getPlayers();
    }

    @PostMapping
    public void postPlayer(Player player)
    {
        playerService.postPlayer(player);
    }


}
