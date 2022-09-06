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
    Text,
    Badge,
} from "@chakra-ui/react";

import {MdKeyboardTab} from "react-icons/md"
import {AiOutlineUser} from "react-icons/ai"
import {TbCalendar} from "react-icons/tb"
import {TbCalendarTime} from "react-icons/tb"
import {GiHouseKeys} from "react-icons/gi"

import { updateReservation } from "../../services/key.service";

const ReservationItem = ({id, colaborador, chave, data_reserva, data_devolucao, devolvido}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const updateReservationById = async (id) => {
        const data = JSON.stringify({devolvido: true})
        const response = await updateReservation(id, data);
        const statusCode = response.status;
        if (statusCode == 200) {
            toast({
              title: "Chave devolvida",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            onClose()
          } else {
            toast({
              title: "Entre em contato com suporte",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
    };
    return (
        <>
            <div className="w-full my-1">
                <div className="w-full flex flex-col items-center justify-between">
                    <div 
                        onClick={onOpen}
                        className="w-full rounded-md bg-[#e5e5e5] hover:bg-[#00000033] p-2 flex items-center justify-between h-[60px] text-[#794150] font-bold text-center"
                        >
                        <p className="w-[230px]">{colaborador}</p>
                        <ol className="flex flex-row items-center w-[100px]">
                            {chave.map((chaves) => (
                                <li key={chaves.id}>
                                    <Badge colorScheme='purple' mx='2' variant='solid'>
                                        {chaves.numero}
                                    </Badge>
                                </li>
                            ))}</ol>
                        <p className="w-[210px]">{data_reserva}</p>
                        <p className="w-[230px]">
                            {data_devolucao === data_reserva ?
                                "--------------------"
                                :
                                data_devolucao}
                        </p>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reserva de {colaborador}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="w-full flex items-center my-4">
                            <AiOutlineUser/>
                            {/* <Heading size='sm'>Colaborador(a):</Heading> */}
                            <Text ml='2'>{colaborador}</Text>
                        </div>
                        <div className="w-full flex items-center my-4">
                            <GiHouseKeys/>
                            {/* <Heading size='sm'>Chaves:</Heading> */}
                            <Text ml='2'>
                                <div className="w-full flex items-start">
                                    <ol className="flex items-start flex-col justify-around">
                                        {chave.map((chaves) => (
                                            <li key={chaves.id}>
                                            <Badge colorScheme='purple' mx='2'>
                                                {chaves.numero} - {chaves.nome}
                                            </Badge>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Text>
                        </div>
                        <div className="w-full flex items-center my-4">
                            <TbCalendar/>
                            {/* <Heading size='sm'>Data Reserva:</Heading> */}
                            <Text ml='2'>{data_reserva}</Text>
                        </div>
                        <div className="w-full flex items-center my-4">
                            <TbCalendarTime/>
                            {/* <Heading size='sm'>Data Devolução:</Heading> */}
                            <Text ml='2'>
                                {data_devolucao === data_reserva 
                                    ?
                                    ""
                                    :
                                    data_devolucao
                                }
                            </Text>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    {/* <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Cancelar
                    </Button> */}
                    {devolvido == true ?
                        <Button 
                            colorScheme="red" 
                            onClick={() => updateReservationById(id)} 
                            rightIcon={<MdKeyboardTab />}
                            variant="outline"
                            disabled
                        >
                            Devolver
                        </Button>
                        :
                        <Button 
                            colorScheme="red" 
                            onClick={() => updateReservationById(id)} 
                            rightIcon={<MdKeyboardTab />}
                            variant="outline"
                        >
                            Devolver
                        </Button>
                    }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReservationItem