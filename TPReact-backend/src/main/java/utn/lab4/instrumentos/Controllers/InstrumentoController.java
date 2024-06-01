package utn.lab4.instrumentos.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utn.lab4.instrumentos.Entity.Instrumento;
import utn.lab4.instrumentos.Service.InstrumentoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/instrumentos")
@CrossOrigin(origins = "*")
public class InstrumentoController {
    @Autowired//Enlazamos servicio
    private final InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        this.instrumentoService = instrumentoService;
    }


    @GetMapping("/")
    public List<Instrumento> getAll(){
        return instrumentoService.getInstrumentos();

    }

    @GetMapping("/{instrumentoId}")
    public Optional<Instrumento> getById(@PathVariable("instrumentoId") Long instrumentoId){
        return instrumentoService.getInstrumento(instrumentoId);
    }

    @DeleteMapping ("/{instrumentoId}")
    public void saveUpdate(@PathVariable("instrumentoId") Long instrumentoId){
        instrumentoService.deleteinstrumento(instrumentoId);
    }

    @PostMapping("/")
    public void saveUpdate(@RequestBody Instrumento instrumento){

        instrumentoService.saveOrUpdateinstrumento(instrumento);
    }

    @PutMapping("/{instrumentoId}")
    public void Update(@PathVariable("instrumentoId") Long instrumentoId, @RequestBody Instrumento instrumento) {

        Instrumento instrumentoExistente = instrumentoService.getInstrumento(instrumentoId).orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));
        // Actualiza los campos del instrumento existente con los valores del instrumento recibido
        instrumentoExistente.setCantidad_vendida(instrumento.getCantidad_vendida());
        instrumentoExistente.setCosto_envio(instrumento.getCosto_envio());
        instrumentoExistente.setDescripcion(instrumento.getDescripcion());
        instrumentoExistente.setImagen(instrumento.getImagen());
        instrumentoExistente.setInstrumento(instrumento.getInstrumento());
        instrumentoExistente.setMarca(instrumento.getMarca());
        instrumentoExistente.setModelo(instrumento.getModelo());
        instrumentoExistente.setPrecio(instrumento.getPrecio());
        instrumentoExistente.setCategoria(instrumento.getCategoria()); // Actualiza el objeto Categoria
        // Llama al servicio para guardar la actualización del instrumento
        instrumentoService.Updateinstrumento(instrumentoExistente);
    }
}