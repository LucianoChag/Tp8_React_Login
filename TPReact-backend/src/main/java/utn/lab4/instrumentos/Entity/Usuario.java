package utn.lab4.instrumentos.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombreUsuario;

    @Column(nullable = false)
    private String clave;

    @Column(nullable = false)
    private String rol; // Asegúrate de que el rol está en mayúsculas, e.g., "ROLE_ADMIN"

    // Métodos para encriptar la clave
    public void setClave(String clave) {
        this.clave = encriptarClave(clave);
    }

    private String encriptarClave(String clave) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] hash = md.digest(clave.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
