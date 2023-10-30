package game.backend;

import game.backend.user.ApplicationUser;
import game.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {

			if(userRepository.findByUsername("John").isPresent()) return;

			ApplicationUser user1 = new ApplicationUser(1, "John", passwordEncoder.encode("password"));
			userRepository.save(user1);

		};
	}

}
