import {
    Tr,
    Td,
} from "@chakra-ui/react";

const CardReservation = ({ pessoa, chaves, data_reserva, data_devolucao }) => {
    <>
        <div className="w-full flex flex-col items-center justify-around">
            <div className="w-full rounded-md bg-[#e5e5e5] p-2 flex items-center justify-evenly h-[60px] text-[#794150] font-bold">
                {/* <div>{reservation.pessoa.nome}</div>
                <div>{reservation.chaves}</div>
                <div>{reservation.data_reserva_formatada}</div>
                <div>{reservation.data_devolucao_formatada}</div> */}
            </div>
        </div>
    </>
}

export default CardReservation