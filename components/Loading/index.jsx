import { Spinner } from '@chakra-ui/react'

const Loading = ({ show }) => {
    return show ? (
      <div className="w-[90%] h-full absolute z-[9] flex justify-center text-center items-center">
        <Spinner size='xl' />
      </div>
    ) : null
  }
  
  export default Loading