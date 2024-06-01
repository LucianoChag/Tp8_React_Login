package utn.lab4.instrumentos.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.lab4.instrumentos.Entity.Instrumento;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento,Long> {

}

