import {React, useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultiSelect = ({Options, isOptionSelected}) => {
  const handleChange = (selected) => {
    isOptionSelected(selected)
  }

  return (
    <>
        <div className="w-full my-2">
            <Select
              components={animatedComponents}
              isMulti
              isClearable
              placeholder="Selecione uma ou mais chaves"
              noOptionsMessage={() => "Nenhuma chave encontrada"}
              options={Options.map((option) => ({label: option.numero + ' - ' + option.nome, value: option.id}))}
              onChange={handleChange}
            />
        </div>
    </>
  );
}

export default MultiSelect