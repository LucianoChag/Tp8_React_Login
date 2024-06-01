package utn.lab4.instrumentos.Controllers;


import org.springframework.web.bind.annotation.*;
import utn.lab4.instrumentos.Entity.Categoria;
import utn.lab4.instrumentos.Service.CategoriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }
    @GetMapping("/")
    public List<Categoria> getAll(){
        return categoriaService.getCategorias();

    }
    @GetMapping("/{categoriaId}")
    public Optional<Categoria> getById(@PathVariable("categoriaId") Long categoriaId){
        return categoriaService.getCategoria(categoriaId); // Usa la instancia de categoriaService para llamar a getCategoria
    }
}
