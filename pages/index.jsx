import {useState, useEffect} from 'react';
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
} from "@chakra-ui/react";
import ListReservation from "../components/ListReservation";
import { HiOutlineKey } from "react-icons/hi";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";

import {getAllKeys, getAllPeoples, createReservation, updateKey} from "../services/key.service";
import { useRouter } from 'next/router'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState('');
  const [key, setKey] = useState("");
  const [keys, setKeys] = useState([])
  const [people, setPeoples] = useState([])
  const [newReservations, setReservations] = useState({
    pessoas: '',
    chaves: [],
  })

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

  const AddReservation = async (e) => {
    e.preventDefault();
    newReservations.chaves = keys.map((option) => (option.value))
    newReservations.pessoas = user.value
    newReservations.pessoas === undefined || '' ? (
      toast({
        title: "Erro",
        description: "Campo pessoa é obrigatório",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    ): (
      // console.log(newReservations)
      newReservations.chaves.length === 0 ? (
        toast({
          title: "Erro",
          description: "Campo chaves é obrigatório",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      ): (
        null
      )
    )
    
    for (let i = 0; i < newReservations.chaves.length; i++) {
      let id = newReservations.chaves[i]
      const updateKeyById = async (id) =>{
        const data = {"reservada": true}
        const response = await updateKey(id, data);
      }
      updateKeyById(id)
    }

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
          <Button 
            leftIcon={<HiOutlineKey />} 
            onClick={openModal}           
            backgroundColor='#fff' 
            color='#794150' 
            variant='solid'
          >
            Pegar Chave
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar reserva</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="w-full flex flex-col items-start justify-center">
                <Heading size='sm'>Colaborador(a):</Heading>
                <Select Options={people} isOptionSelected={(option) => setUser(option)}/>
                <Heading size='sm'>Chave(s):</Heading>
                <MultiSelect Options={key} isOptionSelected={(options) => setKeys(options)}/>
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

        <ListReservation />
      </div>
    </>
  );
}
