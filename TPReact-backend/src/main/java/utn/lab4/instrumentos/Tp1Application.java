package utn.lab4.instrumentos;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import utn.lab4.instrumentos.Entity.Categoria;
import utn.lab4.instrumentos.Entity.Instrumento;
import utn.lab4.instrumentos.Entity.Usuario;
import utn.lab4.instrumentos.Repository.*;

@SpringBootApplication
public class Tp1Application {

	public static void main(String[] args) {
		SpringApplication.run(Tp1Application.class, args);
		System.out.println("Funcionando");
	}

	@GetMapping("/")
	public String paginaInicio() {
		return "index";
	}

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	@Transactional
	CommandLineRunner init(CategoriaRepository categoriaRepository,
						   InstrumentoRepository instrumentoRepository,
						   PedidoDetalleRepository pedidoDetalleRepository,
						   PedidoRepository pedidoRepository,
						   UsuarioRepository usuarioRepository) {
		return args -> {

			jdbcTemplate.execute("ALTER TABLE instrumentos MODIFY COLUMN descripcion text");

			Categoria cuerdas = Categoria.builder().denominacion("Cuerda").build();
			Categoria viento = Categoria.builder().denominacion("Viento").build();
			Categoria percusion = Categoria.builder().denominacion("Percusion").build();
			Categoria electronico = Categoria.builder().denominacion("Electronico").build();

			categoriaRepository.save(cuerdas);
			categoriaRepository.save(viento);
			categoriaRepository.save(percusion);
			categoriaRepository.save(electronico);

			instrumentoRepository.save(new Instrumento(1L, "Mandolina Instrumento Musical Stagg Sunburst", "Stagg", "M20", "nro10.jpg", "G", 28, 2450, "Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.", cuerdas));
			instrumentoRepository.save(new Instrumento(2L, "Pandereta Pandero Instrumento Musical", "DyM ventas", "32 sonajas", "nro9.jpg", "150", 10, 325, "1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !!", percusion));
			instrumentoRepository.save(new Instrumento(3L, "Triangulo Musical 24 Cm Percusion", "LBP", "24", "nro8.jpg", "250", 3, 260, "Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio", percusion));
			instrumentoRepository.save(new Instrumento(4L, "Bar Chimes Lp Cortina Musical 72 Barras", "FM", "LATIN", "nro7.jpg", "G", 2, 2250, "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B", percusion));
			instrumentoRepository.save(new Instrumento(5L, "Shekeres. Instrumento. Música. Artesanía.", "Azalea Artesanías", "Cuentas de madera", "nro6.jpg", "300", 5, 850, "Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.", percusion));
			instrumentoRepository.save(new Instrumento(6L, "Antiguo Piano Aleman Con Candelabros.", "Neumeyer", "Stratus", "nro3.jpg", "2000", 0, 17000, "Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.", cuerdas));
			instrumentoRepository.save(new Instrumento(7L, "Guitarra Ukelele Infantil Grande 60cm", "GUITARRA", "UKELELE", "nro4.jpg", "G", 5, 500, "Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad", cuerdas));
			instrumentoRepository.save(new Instrumento(8L, "Teclado Organo Electronico Musical Instrumento 54 Teclas", "GADNIC", "T01", "nro2.jpg", "G", 1375, 2250, "Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm", electronico));
			instrumentoRepository.save(new Instrumento(9L, "Instrumentos De Percusión Niños Set Musical Con Estuche", "KNIGHT", "LB17", "nro1.jpg", "300", 15, 2700, "Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.", percusion));
			instrumentoRepository.save(new Instrumento(10L, "Batería Musical Infantil Juguete Niño 9 Piezas Palillos", "Bateria", "Infantil", "nro5.jpg", "250", 250, 380, "DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM", percusion));
			instrumentoRepository.save(new Instrumento(11L, "Saxofón Alto", "YAMAHA", "YAS-280", "nro11.jpg", "G", 7, 3200, "El saxofón alto Yamaha YAS-280 ofrece una gran calidad de sonido y una excelente durabilidad. Perfecto para estudiantes y músicos avanzados. Incluye estuche y boquilla.", viento));

			// Crear usuarios con contraseñas encriptadas
			if (usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
				Usuario admin = new Usuario();
				admin.setNombreUsuario("admin");
				admin.setClave(passwordEncoder.encode("admin123"));
				admin.setRol("ROLE_ADMIN");
				usuarioRepository.save(admin);
			}

			if (usuarioRepository.findByNombreUsuario("user").isEmpty()) {
				Usuario user = new Usuario();
				user.setNombreUsuario("user");
				user.setClave(passwordEncoder.encode("user123"));
				user.setRol("ROLE_USER");
				usuarioRepository.save(user);
			}
		};
	}
}