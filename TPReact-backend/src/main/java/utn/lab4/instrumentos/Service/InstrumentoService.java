package utn.lab4.instrumentos.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.lab4.instrumentos.Entity.Instrumento;
import utn.lab4.instrumentos.Repository.InstrumentoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoService {
    @Autowired
    InstrumentoRepository instrumentoRepository;

    public List<Instrumento> getInstrumentos(){
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        return instrumentos;
    }

    public Optional<Instrumento> getInstrumento(Long id){
        return instrumentoRepository.findById(id);

    }
    public void deleteinstrumento(Long id){
        instrumentoRepository.deleteById(id);
    }

    public void saveOrUpdateinstrumento(Instrumento instrumento){

        instrumentoRepository.save(instrumento);
    }
    public void Updateinstrumento(Instrumento instrumento){

        instrumentoRepository.save(instrumento);
    }
}
