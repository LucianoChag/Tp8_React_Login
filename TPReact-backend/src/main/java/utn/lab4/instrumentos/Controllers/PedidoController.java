package utn.lab4.instrumentos.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utn.lab4.instrumentos.Entity.DTO.PedidoMP;
import utn.lab4.instrumentos.Entity.Pedido;
import utn.lab4.instrumentos.Entity.PreferenceMP;
import utn.lab4.instrumentos.Service.PedidoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/pedido")
@CrossOrigin(origins = "*")
public class PedidoController {
    @Autowired//Enlazamos servicio
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }


    @GetMapping("/")
    public List<Pedido> getAll(){
        return pedidoService.getPedidos();

    }

    @GetMapping("/{PedidoId}")
    public Optional<Pedido> getById(@PathVariable("PedidoId") Long PedidoId){
        return pedidoService.getPedido(PedidoId);
    }

    @DeleteMapping ("/{PedidoId}")
    public void saveUpdate(@PathVariable("PedidoId") Long pedidoId){
        pedidoService.deletePedido(pedidoId);
    }

    @PostMapping("/")
    public void saveUpdate(@RequestBody Pedido pedido){

        pedidoService.saveOrUpdatePedido(pedido);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/create_preference_mp")
    public PreferenceMP crearPreferenciaMercadoPago(@RequestBody PedidoMP pedido){
        MercadoPagoController cMercadoPago = new MercadoPagoController();
        PreferenceMP preference = cMercadoPago.getPreferenciaIdMercadoPago(pedido);
        return preference;
    }

}
