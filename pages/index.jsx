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
} from "@chakra-ui/react";
import ListReservation from "../components/ListReservation";
import { HiOutlineKey } from "react-icons/hi";
import { AiOutlineReload } from "react-icons/ai";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";

import {getAllKeys, getAllPeoples, createReservation} from "../services/key.service";



export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState('');
  const [key, setKey] = useState("");
  const [keys, setKeys] = useState([])
  const [people, setPeoples] = useState([])
  const [reservations, setReservations] = useState({
    pessoas: '',
    chaves: [],
  })

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
    reservations.chaves = keys.map((option) => (option.value))
    reservations.pessoas = user.value
    console.log(reservations)
    // const response = await createReservation(reservations); DESCOMENTAR DPS DAS ALTERAÇÃOES NA API
  }


  return (
    <>
      <div className="w-full flex flex-col justify-start items-start px-4 h-screen bg-[#e5e5e5]">
        <div className="w-full flex items-center justify-start my-4">
          <Button 
            leftIcon={<HiOutlineKey />} 
            onClick={onOpen}           
            backgroundColor='#fff' 
            color='#794150' 
            variant='solid'
            _hover={{ borderColor: '#000000b3' }}
          >
            Pegar Chave
          </Button>

          <Button 
            leftIcon={<AiOutlineReload />} 
            onClick={onOpen}           
            backgroundColor='#fff' 
            color='#794150' 
            variant='solid'
            _hover={{ borderColor: '#000000b3' }}
            mx="2"
          >
            Atualizar
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
                <div className="w-full flex flex-col items-center justify-center">
                  <Select Options={people} isOptionSelected={(option) => setUser(option)}/>
                  <MultiSelect Options={key} isOptionSelected={(options) => setKeys(options)}/>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="ghost" onClick={AddReservation}>Pegar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ListReservation />
      </div>
    </>
  );
}
