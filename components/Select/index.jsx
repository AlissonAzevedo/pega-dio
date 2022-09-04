import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SelectPeople = ({ Options, isOptionSelected }) => {

  const handleChange = (selected) => {
    isOptionSelected(selected)
  }

  return (
    <>
      <div className="w-full my-2 text-[#794150]">
        <Select
          closeMenuOnSelect={true}
          isClearable
          components={animatedComponents}
          placeholder="Digite ou selecione o colaborador"
          noOptionsMessage={() => "Colaborador não encontrado"}
          options={Options.map((option) => ({ label: option.nome, value: option.id }))}
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
        />
      </div>
    </>
  );
}

export default SelectPeople