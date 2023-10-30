package game.backend.session;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationDTO {

    private String username;
    private String password;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String password) {
        super();
        this.username = username;
        this.password = password;
    }

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password;
    }

}
