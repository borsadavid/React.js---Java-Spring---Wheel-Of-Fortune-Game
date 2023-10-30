package game.backend.GameHistory.Game;
import game.backend.user.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findAllByUserId(Integer id);

}
