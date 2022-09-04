import { useEffect, useState } from 'react';

import {
  Button,
} from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";

import { getAllReservation } from "../../services/key.service";


const ListReservation = () => {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllReservations = async () => {
      const response = await getAllReservation();
      setReservations(response);
    };
    loadAllReservations();
  }, []);

  const updateListReservation = async () => {
    const response = await getAllReservation();
    setReservations(response);
  };
  return (
    <>
      <div className="mt-2 flex flex-col justify-start items-start w-full p-4 bg-[#FFF] rounded-md h-[80%] overscroll-auto">
        <Button
          leftIcon={<AiOutlineReload />}
          onClick={() => updateListReservation()}
          backgroundColor='#fff'
          color='#794150'
          variant='solid'
          _hover={{ borderColor: '#000000b3' }}
          size='md'
        >
          Atualizar
        </Button>
        <div className="w-full p-2 flex items-center justify-around font-bold">
          <div>Nome</div>
          <div>Chaves</div>
          <div>Entrega</div>
          <div>Devolução</div>
        </div>
        <div className="w-full overflow-auto">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="w-full my-1">
              <div className="w-full flex flex-col items-center justify-between">
                <div className="w-full rounded-md bg-[#e5e5e5] p-2 flex items-center justify-between h-[60px] text-[#794150] font-bold text-center">
                  <p className="w-[230px]">{reservation.nome_pessoa}</p>
                  <ol className="flex flex-row justify-around w-[100px]">
                    {reservation.chave.map((chaves) => (
                      <li key={chaves.id}>
                        {chaves.numero}
                      </li>
                    ))}</ol>
                  <p className="w-[210px]">{reservation.data_reserva_formatada}</p>
                  <p className="w-[230px]">
                    {reservation.data_devolucao_formatada === reservation.data_reserva_formatada ?
                      "--------------------"
                      :
                      reservation.data_devolucao_formatada}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListReservation