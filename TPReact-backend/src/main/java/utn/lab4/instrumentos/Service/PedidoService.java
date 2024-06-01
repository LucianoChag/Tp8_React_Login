package utn.lab4.instrumentos.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.lab4.instrumentos.Entity.Pedido;
import utn.lab4.instrumentos.Repository.PedidoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    @Autowired
    PedidoRepository pedidoRepository;

    public List<Pedido> getPedidos(){
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos;
    }
    public Optional<Pedido> getPedido(Long id){
        return pedidoRepository.findById(id);

    }
    public void deletePedido(Long id){
        pedidoRepository.deleteById(id);
    }

    public void saveOrUpdatePedido(Pedido pedido){

        pedidoRepository.save(pedido);
    }
    public void UpdatePedido(Pedido pedido){

        pedidoRepository.save(pedido);
    }
}
