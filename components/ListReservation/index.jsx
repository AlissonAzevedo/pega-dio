import Loading from '../Loading';
import ReservationItem from '../ReservationItem';

const ListReservation = ({ reservations, filteredResults, showLoading, searched }) => {
  return (
    <>
      <Loading show={showLoading} />
      <div className="mt-2 flex flex-col justify-start items-start w-full p-4 bg-[#FFF] rounded-md h-[85%] ">
        <div className="w-full p-2 flex items-center justify-around font-bold">
          <div>Colaborador</div>
          <div>Chaves</div>
          <div>Entrega</div>
          <div>Devolução</div>
        </div>
        <div className="w-full overflow-auto scrollbar-thin scrollbar-thumb-[#00000033]  scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {searched.length > 1
            ? filteredResults.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                id={reservation.id}
                colaborador={reservation.nome_pessoa}
                chave={reservation.chave}
                data_reserva={reservation.data_reserva}
                data_devolucao={reservation.data_devolucao}
                devolvido={reservation.devolvido}
              />
            )
            )
            :
            (
              reservations.map((reservation) => (
                <ReservationItem
                  key={reservation.id}
                  id={reservation.id}
                  colaborador={reservation.nome_pessoa}
                  chave={reservation.chave}
                  data_reserva={reservation.data_reserva}
                  data_devolucao={reservation.data_devolucao}
                  devolvido={reservation.devolvido}
                />
              ))
            )
          }
        </div>
      </div>
    </>
  )
}

export default ListReservation