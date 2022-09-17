import { React, useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultiSelect = ({ Options, isOptionSelected }) => {
  const handleChange = (selected) => {
    isOptionSelected(selected)
  }

  return (
    <>
      <div className="w-full my-2 text-[#794150]">
        <Select
          components={animatedComponents}
          isMulti
          isClearable
          placeholder="Digite ou selecione a chave"
          noOptionsMessage={() => "Nenhuma chave encontrada"}
          options={Options.map((option) => ({ label: option.numero + ' - ' + option.nome, value: option.id, reservation: option.reservada }))}
          onChange={handleChange}
          loadingMessage={() => "Carregando..."}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#e5e5e5',
            },
          })}
          isOptionDisabled={(option) => option.reservation == true}
        />
      </div>
    </>
  );
}

export default MultiSelect