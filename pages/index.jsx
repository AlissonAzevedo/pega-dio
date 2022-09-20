/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Heading,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import ListReservation from "../components/ListReservation";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";

import { HiOutlineKey } from "react-icons/hi";
import { AiOutlineReload } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";


import { getAllKeys, getAllPeoples, getAllReservation, createReservation, updateKey } from "../services/key.service";
import { useRouter } from 'next/router'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState('');
  const [key, setKey] = useState("");
  const [keys, setKeys] = useState([])
  const [people, setPeoples] = useState([])
  const [newReservations, setNewReservations] = useState({
    pessoas: '',
    chaves: [],
  })
  const [reservations, setReservations] = useState([]);
  const [showLoading, setShowLoading] = useState(true)
  const [searched, setSearched] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const toast = useToast();
  const router = useRouter()

  useEffect(() => {
    const loadAllPeoples = async () => {
      const response = await getAllPeoples();
      setPeoples(response);
    };
    loadAllPeoples();
  }, []);

  useEffect(() => {
    const loadAllKeys = async () => {
      const response = await getAllKeys();
      setKey(response);
    };
    loadAllKeys();
  }, []);

  // LIST RESERVATION

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

  const AddReservation = async (e) => {
    e.preventDefault();
    newReservations.chaves = keys.map((option) => (option.value))
    newReservations.pessoas = user.value
    newReservations.pessoas === undefined || '' ? (
      toast({
        title: "Erro",
        description: "Campo colaborador é obrigatório",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    ) : (
      newReservations.chaves.length === 0 ? (
        toast({
          title: "Erro",
          description: "Adicione pelo menos uma chave",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      ) : (
        null
      )
    )

    for (let i = 0; i < newReservations.chaves.length; i++) {
      let id = newReservations.chaves[i]
      const updateKeyById = async (id) => {
        const data = { "reservada": true }
        const response = await updateKey(id, data);
      }
      updateKeyById(id)
    }
    if (newReservations.pessoas !== '' && newReservations.chaves.length !== 0) {
      const response = await createReservation(newReservations); //DESCOMENTAR DPS DAS ALTERAÇÃOES NA API
      onClose()
      const statusCode = response.status;
      if (statusCode == 201) {
        toast({
          title: "Sucesso",
          description: "Reserva feita com sucesso",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Entre em contato com suporte",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      newReservations.chaves = []
      newReservations.pessoas = ''
      updateListReservation()
    }
  }
  const openModal = () => {
    onOpen()
    const loadAllKeys = async () => {
      const response = await getAllKeys();
      setKey(response);
    };
    loadAllKeys();
  }
  return (
    <>
      <div className="w-full flex flex-col justify-start items-start px-4 h-screen bg-[#e5e5e5]">
        <div className="w-full flex items-center justify-start my-4">
          <div className="flex items-center w-full">
                <Button
                leftIcon={<HiOutlineKey />}
                onClick={openModal}
                backgroundColor='#fff'
                color='#794150'
                variant='solid'
                size='md'
                _hover={{ backgroundColor: '#00000033' }}
                mr='2'
              >
                Pegar Chave
              </Button>

              <Button
                leftIcon={<AiOutlineReload />}
                onClick={() => updateListReservation()}
                backgroundColor='#fff'
                color='#794150'
                variant='solid'
                _hover={{ backgroundColor: '#00000033' }}
                size='md'
                mr='2'
              >
                Atualizar
              </Button>
            <div className="w-full flex items-center justify-between">
              <InputGroup mx='2' w='400px'>
                <InputLeftElement pointerEvents="none" children={<BiSearch />} />
                <Input
                  type="text"
                  border='1px'
                  focusBorderColor="none"
                  backgroundColor='#fff'
                  textColor='#794150'
                  placeholder="Digite o nome do colaborador"
                  onChange={(e) => searchItems(e.target.value)}
                />
              </InputGroup>
              <img src="assets/brand-diocesano.png" alt="logo diocesano" width="300px" />
            </div>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar reserva</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="w-full flex flex-col items-start justify-center">
                <Heading size='sm'>Colaborador(a):</Heading>
                <Select Options={people} isOptionSelected={(option) => setUser(option)} />
                <Heading size='sm'>Chave(s):</Heading>
                <MultiSelect Options={key} isOptionSelected={(options) => setKeys(options)} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={AddReservation}>Pegar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ListReservation
          reservations={reservations}
          filteredResults={filteredResults}
          showLoading={showLoading}
          searched={searched}
          searchItems={searchItems}
        />
      </div>
    </>
  );
}
