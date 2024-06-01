package utn.lab4.instrumentos.Service;

import utn.lab4.instrumentos.Entity.Usuario;
import utn.lab4.instrumentos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> login(String nombreUsuario, String clave) {
        String encriptada = encriptarClave(clave);
        return usuarioRepository.findByNombreUsuarioAndClave(nombreUsuario, encriptada);
    }

    public Usuario guardarUsuario(Usuario usuario) {
        usuario.setClave(encriptarClave(usuario.getClave()));
        return usuarioRepository.save(usuario);
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

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + nombreUsuario));
        return org.springframework.security.core.userdetails.User.withUsername(usuario.getNombreUsuario())
                .password(usuario.getClave())
                .roles(usuario.getRol())
                .build();
    }
}
