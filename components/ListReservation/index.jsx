/* eslint-disable react/no-children-prop */
import { useEffect, useState } from 'react';

import {
  Button,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { AiOutlineReload } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

import Loading from '../Loading';
import ReservationItem from '../ReservationItem';

import { getAllReservation } from "../../services/key.service";


const ListReservation = ({filteredResults, reservations}) => {

  const [reservations, setReservations] = useState([]);
  const [showLoading, setShowLoading] = useState(true)
  const [searched, setSearched] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const loadAllReservations = async () => {
      const response = await getAllReservation();
      setReservations(response);
    };
    loadAllReservations();
  }, []);

  useEffect(() => {
    if (reservations) {
      const loadingDisabler = setTimeout(() => {
        setShowLoading(false)
      }, 800)

      return () => clearInterval(loadingDisabler)
    }
  }, [reservations])

  const updateListReservation = async () => {
    const response = await getAllReservation();
    setReservations(response);
  };
  setTimeout(() => {
    updateListReservation()
  }, 120000)
  const searchItems = (searchValue) => {
    setSearched(searchValue);
    if (searched !== "") {
      const filteredData = reservations.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searched.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(reservations);
    }
  };

  return (
    <>
      <Loading show={showLoading} />
      <div className="mt-2 flex flex-col justify-start items-start w-full p-4 bg-[#FFF] rounded-md h-[80%] overscroll-auto">
        <div className="flex items-center w-full sm:mx-4 my-4">
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
          <div className="w-full flex items-center justify-center">
            <InputGroup mx='2' w='400px'>
              <InputLeftElement pointerEvents="none" children={<BiSearch />} />
              <Input
                type="text"
                focusBorderColor="#794150"
                placeholder="Digite um nome"
                onChange={(e) => searchItems(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="w-full p-2 flex items-center justify-around font-bold">
          <div>Colaborador</div>
          <div>Chaves</div>
          <div>Entrega</div>
          <div>Devolução</div>
        </div>
        <div className="w-full overflow-auto">
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