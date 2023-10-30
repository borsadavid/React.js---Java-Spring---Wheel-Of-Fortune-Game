package game.backend.GameHistory.Game;

import game.backend.GameHistory.Player.Player;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

@Entity
@Table
@Getter
@Setter
public class Game {

    @Id
    @SequenceGenerator(
            name = "game_sequence",
            sequenceName = "game_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "game_sequence"
    )
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id")
    private List<Player> players;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    private String winner;

    @Column(name = "user_id")
    private Integer userId;

    public Game(Long id, List<Player> players) {
        this.id = id;
        this.players = players;
        this.createdAt = new Date();
        this.winner = "";
    }

    public Game() {
        this.createdAt = new Date();
    }

}
