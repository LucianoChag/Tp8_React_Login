package utn.lab4.instrumentos.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.lab4.instrumentos.Entity.Pedido;
@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Long> {
}
